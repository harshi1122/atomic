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
  MenuListPanelAnimations,
  MenuListSheetAnimations,
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
  children?: ((ctx: SelectContextValue) => ReactNode) | ReactNode
  /**
   * A decorative icon which is placed at the end of the Button, indicating the input differs from others.
   */
  icon?: FC
  /**
   * Text to display when nothing has been selected.
   *
   * @default undefined
   */
  placeholder?: string
}

/**
 * The "Input" portion of the Select component.
 * This is the component the user will interact with to open the Select-menu,
 * and will display the currently selected value.
 *
 * You may provide a function as this component's `children`.
 * This function will be called with an object containing the following properties:
 *
 * * `error` - The `FieldError` of this Select, should it be failing `validation`.
 * * `value` - The currently selected value.
 */
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

export const SelectListPanelAnimations: MenuListAnimationVariants = {
  close: {
    ...MenuListPanelAnimations.close,
    scaleX: '100%',
    scaleY: '96%',
  },
  open: MenuListPanelAnimations.open,
}

// --

/**
 * A component to be wrapped around a list of Select items.
 *
 * This component wraps `Menu.Items`, providing additional, befitting styles and tweaking the animations to fit.
 */
const SelectList: FC<SelectListProps> = (p) => {
  const styles = useStyler('SelectList')
  return (
    <Menu.List
      panelAnimations={SelectListPanelAnimations}
      sheetAnimations={MenuListSheetAnimations}
      as={Listbox.Options}
      className={css(styles)}
      {...p}
    />
  )
}

SelectList.displayName = 'Select.List'

// ==

export type SelectOptionProps = CP<typeof Listbox.Option> &
  Partial<MenuItemVariants>

/**
 * Represents a single item in this Select component.
 *
 * The item will either render its provided `value`, or its `children` - should one be provided.
 *
 * Items can be three different states:
 * * `active` when actively hovered over or focused on.
 * * `disabled` when activating and selecting the item is disallowed.
 * * `selected` when the item is the Select components current value.
 */
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
   * Apply validation rules for this Select.
   *
   * @default {}
   */
  validation?: RegisterOptions
}

type Select = FC<SelectProps> & {
  Button: typeof SelectButton
  List: typeof SelectList
  Option: typeof SelectOption
}

/**
 * A component for selecting a _single_ value, with integration with Redwood's form API.
 * Thie component can be used as a drop-in replacement for other field components.
 */
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
