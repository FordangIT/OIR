interface ErrorTextProps {
  errors: string | undefined;
}

export const ErrorText = ({ errors }: ErrorTextProps) => {
  return <div className="row-position text-red-600 text-sm">{errors}</div>;
};
