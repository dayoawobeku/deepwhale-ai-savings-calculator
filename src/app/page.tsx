import {cache} from 'react';
import {cookies} from 'next/headers';
import {createServerComponentClient} from '@supabase/auth-helpers-nextjs';
import Form from '@/components/form';
import {Database} from '@/schema';

const createServerClient = cache(() => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  });
});

export default async function Home() {
  const supabase = createServerClient();

  const {data, error} = await supabase.from('on_demand_services').select('*');

  return (
    <main className="flex flex-col">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <h1 className="text-4xl md:text-5xl font-bold text-grey">
          How much can I save?
        </h1>
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

      <Form pricingData={data || []} />
    </main>
  );
}
