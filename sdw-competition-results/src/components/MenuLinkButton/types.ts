export interface LinkButtonProps {
  label: string;
  to: string;
  selected?: boolean;
}
export interface MenuLinkButtonProps extends LinkButtonProps {
  selected?: boolean;
}

export interface MenuLinkButtonGroupProps {
  buttons: LinkButtonProps[];
  selectedButton?: string;
}
