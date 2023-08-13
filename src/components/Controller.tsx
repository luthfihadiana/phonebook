import React, { ReactElement, ReactNode} from 'react';
import {Control, FieldValues, Path, Controller as RHFController} from 'react-hook-form';
import { FormItem } from '.';

type ControllerPropType<DataSchemeType extends FieldValues> = {
  control: Control<DataSchemeType, null>,
  label?:string,
  name: Path<DataSchemeType>,
  "data-testid"?: string | undefined,
  suffixElement?: ReactNode,
  children: ReactElement,
};

function Controller<T extends FieldValues>({
  control,
  label,
  name,
  'data-testid': dataTestId = '',
  suffixElement,
  children,
}:ControllerPropType<T>){
  return(
    <RHFController
      control={control}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <FormItem
          label={label}
          colorScheme={error ? 'danger': 'default'}
          message={error?.message || ''}
          data-testid={dataTestId}
          suffixElement={suffixElement}
        >
          {
            React.cloneElement(children, {
              onChange,
              value,
            })
          }
        </FormItem>
      )}
    />
  );
}

export default Controller;