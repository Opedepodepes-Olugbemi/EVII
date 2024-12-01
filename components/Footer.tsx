export function Footer() {
  return (
    <footer className="fixed bottom-0 w-full border-t border-mirage/10 bg-chalk/80 backdrop-blur-md dark:bg-mirage/80 dark:border-chalk/10 py-4">
      <div className="container flex justify-center items-center px-4 text-sm text-mirage dark:text-chalk">
        <p>
          Powered by{' '}
          <a
            href="https://hume.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-faded-jade hover:text-reddish-orange transition-colors"
          >
            Hume AI
          </a>
        </p>
      </div>
    </footer>
  );
} 