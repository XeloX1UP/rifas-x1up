type SearchTextProps = {
  params: {
    textToSearch: string;
  };
};
export default function SearchText({ params }: SearchTextProps) {
  return <h1>{params.textToSearch}</h1>;
}
