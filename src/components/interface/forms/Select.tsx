import clsx from 'clsx'
import { createContext, useContext } from 'react'
import type { ComponentPropsWithRef as CP, FC, ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'
import { Listbox } from '@headlessui/react'
import { useController } from '@redwoodjs/forms'
import type { RegisterOptions } from '@redwoodjs/forms'

import type { InputVariants } from './Input'
import {
  Menu,
  MenuListAnimationVariants,
  MenuListPanelAnims,
  MenuListSheetAnims,
} from '../Menu'
import type { MenuItemVariants } from '../Menu'

import { useStyler } from '../../../context'
import { css } from '../../../css'
import { cssvar } from '../../../util'

// ==

type SelectContextValue = { error: FieldError; value: string }
const SelectContext = createContext<SelectContextValue>(undefined)
export const useSelectContext = () => useContext(SelectContext)

// ==

const SelectButtonIcon = () => (
  <svg
    fill="currentColor"
    height="18"
    width="18"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      clipRule="evenodd"
      d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      fillRule="evenodd"
    />
  </svg>
)

interface SelectButtonProps extends Partial<InputVariants> {
  children?: ReactNode
  /**
   * A decorative icon which is placed at the end of the Button,
   * indicating the input differs from others.
   */
  icon?: FC
  /**
   * Text to display when nothing has been selected.
   *
   * @default undefined
   */
  placeholder?: string
}

const SelectButton: FC<SelectButtonProps> = ({
  children,
  icon: Icon,
  placeholder,
  variant,
}) => {
  const { error, value } = useSelectContext()

  const inputStyles = useStyler('Input', { variant })
  const buttonStyles = useStyler('SelectButton')

  return (
    <Listbox.Button
      className={clsx(
        css({ ...inputStyles, ...buttonStyles }),
        typeof children !== 'function' &&
          typeof placeholder === 'string' &&
          typeof value === 'undefined' &&
          css({ color: cssvar('color.hint') }),
        typeof error !== 'undefined' && 'danger'
      )}
    >
      {typeof children === 'function'
        ? children({ error, value })
        : children || value || placeholder || 'Select'}
      <Icon />
    </Listbox.Button>
  )
}

SelectButton.displayName = 'Select.Button'
SelectButton.defaultProps = {
  icon: SelectButtonIcon,
  placeholder: undefined,
  variant: 'fill',
}

// ==

export interface SelectListProps {
  children: ReactNode
}

// --

export const SelectListPanelAnims: MenuListAnimationVariants = {
  close: {
    ...MenuListPanelAnims.close,
    scaleX: '100%',
    scaleY: '96%',
  },
  open: MenuListPanelAnims.open,
}

// --

const SelectList: FC<SelectListProps> = (p) => {
  const styles = useStyler('SelectList')
  return (
    <Menu.List
      animations={{ panel: SelectListPanelAnims, sheet: MenuListSheetAnims }}
      as={Listbox.Options}
      className={css(styles)}
      {...p}
    />
  )
}

// ==

export type SelectOptionProps = CP<typeof Listbox.Option> &
  Partial<MenuItemVariants>

const SelectOption: FC<SelectOptionProps> = ({
  children,
  size,
  value,
  ...p
}) => {
  const styles = useStyler('MenuItem', { size })
  return (
    <Listbox.Option
      className={({ active, disabled, selected }) =>
        clsx(
          css(styles),
          active && 'active',
          disabled && 'disabled',
          selected && 'selected'
        )
      }
      value={value}
      {...p}
    >
      {children || value}
    </Listbox.Option>
  )
}

SelectOption.displayName = 'Select.Option'
SelectOption.defaultProps = {
  size: 'md',
}

// ==

export type SelectProps = Omit<CP<typeof Listbox>, 'onChange' | 'value'> & {
  children: ReactNode
  /**
   * The initial value this Select component will appear to have selected.
   *
   * This value **will** be used if the form is submitted without change.
   *
   * @default undefined
   */
  defaultValue?: string
  /**
   * Disable updating the value of this Select component.
   *
   * @default false
   */
  disabled?: boolean
  /**
   * A unique name to identify this input and its value after its form has been submitted.
   */
  name: string
  /**
   * @default {}
   */
  validation?: RegisterOptions
}

type Select = FC<SelectProps> & {
  Button: typeof SelectButton
  List: typeof SelectList
  Option: typeof SelectOption
}

export const Select: Select = ({
  children,
  defaultValue,
  disabled,
  name,
  validation: rules,
}: SelectProps) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ defaultValue, name, rules })

  const styles = useStyler('Menu')

  return (
    <SelectContext.Provider value={{ error, value }}>
      <Listbox
        as="div"
        className={css(styles)}
        disabled={disabled}
        onChange={onChange}
        value={value}
      >
        {children}
      </Listbox>
    </SelectContext.Provider>
  )
}

Select.Button = SelectButton
Select.List = SelectList
Select.Option = SelectOption

Select.displayName = 'Select'
Select.defaultProps = {
  defaultValue: undefined,
  disabled: false,
  validation: {},
  variant: 'fill',
}
