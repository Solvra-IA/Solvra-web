import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/shadcn/button";

interface Cta4Props {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  items?: string[];
}

const defaultItems = [
  "Easy Integration",
  "24/7 Support",
  "Customizable Design",
  "Scalable Performance",
  "Hundreds of Blocks",
];

export const Cta4 = ({
  title = "Call to Action",
  description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto illo praesentium nisi, accusantium quae.",
  buttonText = "Get Started",
  buttonUrl = "https://shadcnblocks.com",
  items = defaultItems,
}: Cta4Props) => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="flex flex-col items-start justify-between gap-8 rounded-2xl bg-muted px-6 py-10 md:flex-row lg:px-16 lg:py-14">
              <div className="md:w-1/2">
                <h2 className="mb-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
                <p className="text-muted-foreground md:text-lg">{description}</p>
                <Button className="mt-6" asChild>
                  <a href={buttonUrl} target="_blank" rel="noreferrer">
                    {buttonText} <ArrowRight className="size-4" />
                  </a>
                </Button>
              </div>
              <div className="md:w-1/3">
                <ul className="flex flex-col space-y-2 text-sm font-medium">
                  {items.map((item, idx) => (
                    <li className="flex items-center" key={idx}>
                      <Check className="mr-4 size-4 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
