import ReactMarkdown from 'react-markdown';

const Recipe = ({recipes}) => {
  return (
    <div className="mt-10 px-3 mb-10">
      <h1 className="text-4xl font-extrabold mb-4">CHEF CLAUDE SUGGESTS:</h1>
      <ReactMarkdown className="space-y-4 text-sm">{recipes}</ReactMarkdown>
    </div>
  );
};

export default Recipe;
