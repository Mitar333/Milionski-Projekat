function App({ params }) {
  console.log(params);
  return (
    <div className="flex justify-center items-center mt-10">
      hello {params.id}
    </div>
  );
}

export default App;
