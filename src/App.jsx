import './App.css';

function App() {
  return (
    <>
      <main key="main">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/books" element={<Books/>}>
            <Route path=":genre" element={<Genre/>}/>
          </Route>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </main>
    </>
  );
}

export default App;
