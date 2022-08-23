export type LineProps = {
  p?: string;
  px?: string;
  py?: string;
  color?: string;
  w?: string;
};
export function Line(props: LineProps) {
  return (
    <div
      style={{
        width: props.w || "1px",
        margin: props.p || undefined,
        marginLeft: props.px || undefined,
        marginRight: props.px || undefined,
        marginTop: props.py || undefined,
        marginBottom: props.py || undefined,
        background: props.color || "#000"
      }}>
      &nbsp;
    </div>
  );
}
