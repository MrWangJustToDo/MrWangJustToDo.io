export const EDITOR_STORE_KEY = "MyReact_playGround";

export const INITIAL_EDITOR = {
  "script.tsx": {
    id: "main",
    type: "text/babel",
    name: "script.tsx",
    language: "typescript",
    content: `
    const usePosition = () => {
      const [position, setPosition] = React.useState({x: 0, y: 0})

      React.useEffect(() => {
        const move = (e) => {
          setPosition({x: e?.clientX, y: e?.clientY})
        }
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
      }, []);

      return position;
    }
    const App = () => {
      const {x, y} = usePosition();
      const [time, setTime] = React.useState(new Date().toString());
      React.useEffect(() => {
        const id = setInterval(() => {
          setTime(new Date().toString())
        }, 1000);
        return () => clearInterval(id);
      }, []);

      return <div className='foo'>Time: {time},  Position: {x} {y}</div>
    }

    ReactDOM.render(<App />, document.querySelector('#root'))
    `,
  },
  "style.css": {
    id: "main",
    name: "style.css",
    language: "css",
    content: `
    .foo {
      color: green;
      font-size: 20px;
      background-color: rgba(100, 100, 100, .2);
      border-radius: 4px;
      width: 100%;
      height: 100px;
      text-align: center;
      line-height: 100px;
    }
    `,
  },
  "index.html": {
    id: "main",
    name: "index.html",
    language: "html",
    content:
      "<h1 style='text-align: center;' >Play MyReact</h1> <div id='root'></div>",
  },
};
