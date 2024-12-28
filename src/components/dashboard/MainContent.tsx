interface MainContentProps {
  children: React.ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="pl-72 p-6">
      {children}
    </main>
  );
}