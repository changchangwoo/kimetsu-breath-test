export default function Result() {
  const result = localStorage.getItem("answers");
  return (
    <div className="h-dvh flex flex-col justify-center items-center gap-5">
      {result?.toString()}
    </div>
  );
}
