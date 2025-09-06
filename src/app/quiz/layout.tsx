export default function QuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="overflow-hidden
    w-full
    max-w-[512px]"
    >
      <div>{children}</div>
    </div>
  );
}
