import type { ActionArgs, LoaderArgs } from "@remix-run/server-runtime";

import { json } from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";

import { getCustomerByName } from "~/models/customer.server";

import { z } from "zod";
import { InputError, makeDomainFunction } from "domain-functions";
import { formAction } from "~/form/form-action.server";
import { Form } from "~/components/form";
import { MaskInput } from "~/components/input";
import { getOrderByIdAndCustomer } from "~/models/order.server";
import type { Order, User } from "@prisma/client";

export async function loader({ params }: LoaderArgs) {
  const customer = await getCustomerByName(params.customer!);

  if (!customer) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  return json(customer);
}

const schema = z.object({
  customer_id: z.string().min(1),
  order: z.string().min(1, { message: "O campo é obrigatório." }),
  identify: z.string(),
});

const mutation = makeDomainFunction(schema)(async (values) => {
  const order = await getOrderByIdAndCustomer(values.customer_id, values.order);

  if (!values.identify || !values.identify.length) {
    throw new InputError("O campo é obrigatório", "identify");
  }

  if (!order) {
    throw "Pedido não encontrado.";
  }

  if (order.user.identify_cpf !== values.identify) {
    throw "Cpf inválido.";
  }

  return order;
});

const isOrder = (data: unknown): data is Order & { user: User } => {
  // @ts-ignore
  return data && data.id;
};

export const action = async ({ request }: ActionArgs) =>
  formAction({
    request,
    schema,
    mutation,
  });

export default function Track() {
  const customer = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof mutation>();
  const transition = useNavigation();

  const isSubmitting = transition.state === "submitting";

  if (isOrder(actionData)) {
    return <h1>TODO</h1>;
  }

  return (
    <main className="mx-auto flex h-screen w-screen items-center justify-center bg-zinc-100 px-4">
      <link rel="stylesheet" href="/track/css/nubank.css" />
      <div className="min-h-max max-w-lg rounded-sm border bg-white px-4 py-6 shadow-md">
        <div className="flex-1">
          <h1 className="text-center text-3xl font-semibold">
            {customer.name}
          </h1>
          <p className="mt-2 mb-6 max-w-md text-center text-sm font-light">
            Mantenha-se sempre atualizado sobre o status de suas entregas, em
            tempo real e com praticidade!
          </p>
        </div>
        <Form
          schema={schema}
          hiddenFields={["customer_id"]}
          values={{
            customer_id: customer.id,
          }}
        >
          {({ Field, Errors, Button, register }) => (
            <>
              <Field name="customer_id" />
              <Field name="order" label="Código do rastreio">
                {({ Label, SmartInput, Errors }) => (
                  <>
                    <Label />
                    <SmartInput />
                    <Errors />
                  </>
                )}
              </Field>
              <Field name="identify" label="CPF">
                {({ Label, Errors }) => (
                  <>
                    <Label />
                    <MaskInput
                      mask="000.000.000-00"
                      {...register("identify")}
                      disabled={isSubmitting}
                    />
                    <Errors />
                  </>
                )}
              </Field>
              <Errors />
              <Button disabled={isSubmitting}>
                {isSubmitting ? "..." : "Ver"}
              </Button>
            </>
          )}
        </Form>
      </div>
    </main>
  );
}

export function CatchBoundary() {
  return (
    <div>
      <h2>We couldn't find that page!</h2>
    </div>
  );
}
