import Form from '@/components/form';

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="flex items-end justify-between">
        <h1 className="text-5xl font-bold text-grey">How much can I save?</h1>
        <div className="flex items-center gap-6 text-sm text-grey font-medium [&>a]:transition-all [&>a]:duration-300 uppercase">
          <a
            href="https://www.linkedin.com/company/deepwhale-ai/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-grey-700"
          >
            <span>LinkedIn</span>
          </a>
          <a
            href="https://twitter.com/biringer_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-grey-700"
          >
            <span>X (TWITTER)</span>
          </a>
          <a
            href="mailto:y.acoine@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-grey-700"
          >
            <span>Email</span>
          </a>
        </div>
      </div>

      <Form />
    </main>
  );
}
