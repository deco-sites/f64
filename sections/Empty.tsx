import Section from "../components/ui/Section.tsx";

export default function Empty() {
  return <></>;
}

export const LoadingFallback = () => <Section.Placeholder height="400px" />;
