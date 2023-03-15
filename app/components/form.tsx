import type { FormProps, FormSchema } from "remix-forms";
import { createForm } from "remix-forms";

import {
  Form as RemixForm,
  useActionData,
  useSubmit,
  useNavigation,
} from "@remix-run/react";
import Button from "./button";
import { Field } from "./field";
import { Label } from "./label";
import { Input } from "./input";

const BaseForm = createForm({
  component: RemixForm,
  useNavigation,
  useSubmit,
  useActionData,
});

export function Form<Schema extends FormSchema>(props: FormProps<Schema>) {
  return (
    <BaseForm
      className="flex flex-col space-y-6"
      fieldComponent={Field}
      labelComponent={Label}
      // @ts-ignore
      inputComponent={Input}
      // multilineComponent={TextArea}
      // selectComponent={Select}
      // radioComponent={Radio}
      // radioGroupComponent={RadioGroup}
      // radioWrapperComponent={InputWrapper}
      // checkboxWrapperComponent={InputWrapper}
      // checkboxComponent={Checkbox}
      buttonComponent={Button}
      // globalErrorsComponent={Errors}
      // errorComponent={Error}
      {...props}
    />
  );
}
