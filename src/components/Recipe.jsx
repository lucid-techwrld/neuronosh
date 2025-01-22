import ReactMarkdown from 'react-markdown';

const Recipe = ({recipes}) => {
  return (
    <div>
      <h1 clasName="text-4xl font-extrabold">CHEF CLAUDE SUGGESTS:</h1>
      <ReactMarkdown clasName="text-sm pl-5">{recipes}</ReactMarkdown>
    </div>
  );
};

export default Recipe;
