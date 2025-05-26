import ReactMarkdown from 'react-markdown';

const Recipe = ({
  recipes
}) => {
  return (
    <div className="mt-10 px-2 mb-10 prose prose-lg prose-gray">
      <h1 className="text-4xl font-extrabold mb-4">CHEF CLAUDE SUGGESTS:</h1>
      <ReactMarkdown
        components={ {
          h1: ({ children }) => <h1 className="text-2xl font-bold text-amber-200 mb-0.5">{children}</h1>,
          h2: ({
            children
          }) => <h2 className="text-3xl font-semibold text-amber-500 mb-0.5">{children}</h2>,
          p: ({
            children
          }) => <p className="text-gray-500 text-2xl">
            {children}
          </p>,
        }}
        >
        {recipes}
      </ReactMarkdown>

    </div>
  );
};

export default Recipe;