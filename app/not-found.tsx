import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <section className="metal-dark">
      <div className="container-x flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="font-serif text-7xl font-bold text-gold md:text-9xl">404</p>
        <h1 className="mt-4 font-serif text-2xl font-bold text-white md:text-3xl">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-md text-white/70">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <Button asChild className="mt-8">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </section>
  );
}
