type IconProps = {
    disabled?: boolean;
    className?: string;
};
declare function CaretIcon({ open }: {
    open?: boolean;
}): JSX.Element;
declare function DeleteIcon(): JSX.Element;
declare function FormIcon(): JSX.Element;
declare function MoveLeftIcon(props: IconProps): JSX.Element;
declare function MoveRightIcon(props: IconProps): JSX.Element;
declare function InfoIcon(): JSX.Element;
declare function EditIcon(): JSX.Element;
declare function PlusIcon(): JSX.Element;
declare function ReplaceAssetIcon(): JSX.Element;
declare function HighlightCommentIcon(): JSX.Element;
declare function ReadCommentIcon(): JSX.Element;
declare function AddCommentIcon(): JSX.Element;
declare function WarningOctagonIcon(): JSX.Element;

export { AddCommentIcon, CaretIcon, DeleteIcon, EditIcon, FormIcon, HighlightCommentIcon, InfoIcon, MoveLeftIcon, MoveRightIcon, PlusIcon, ReadCommentIcon, ReplaceAssetIcon, WarningOctagonIcon };
