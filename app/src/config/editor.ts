/* eslint-disable max-lines */
export const EDITOR_STORE_KEY = "MyReact_playGround";

export const INITIAL_EDITOR = {
  "script.tsx": {
    id: "main",
    type: "text/babel",
    name: "script.tsx",
    language: "typescript",
    content: `

// MyReact dev highlight
(window as any).__highlight__ = true;

const { useState, useEffect, memo } = React;

// ==== reactive api, more api see “https://github.com/MrWangJustToDo/MyReact” ==== //
// reactive api like “Vue"
const { createReactive, reactive, ref, onMounted, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } = (window as any).ReactReactive;

const useReactiveApi_Time = () => {
  const timeRef = ref(new Date().toString());
  let id = null;
  onMounted(() => {
    id = setInterval(() => timeRef.value = new Date().toString(), 1000)
  })

  onUnmounted(() => {
    clearInterval(id);
  })

  return timeRef
}

const useReactiveApi_Position = () => {
  const position = reactive({ x: 0, y: 0 });
  const action = (e) => (position.x = e.clientX, position.y = e.clientY);
  onMounted(() => {
    window.addEventListener("mousemove", action);
  })

  onUnmounted(() => {
    window.removeEventListener("mousemove", action);
  })

  return position
}

const ReactiveHook = createReactive(() => {
  const timeRef = useReactiveApi_Time();
  const position = useReactiveApi_Position();
  return { timeRef, position }
})

const TestReactive = createReactive({
  setup: () => {
    const valueRef = ref("");
    const count = ref(0);
    const changeRef = (e) => {
      valueRef.value = e.target.value;
    };

    onBeforeUpdate(() => {
      // count.current++;
      count.value++;
      // console.log('TestReactive before update')
    })

    return { changeRef, valueRef, count };
  },
  render: ({ valueRef, changeRef, count, isMemo }) => { return <div> <h3>{ isMemo ? 'memo reactive' : 'reactive' }</h3> <p>update count: {count}</p> reactive control component: <input value={valueRef} onChange={changeRef} /></div> }
})

const MemoTestReactive = memo(TestReactive);

// ==== reactive example done ==== //

// ==== antd example ==== //

const { TimePicker, Button, Modal, notification, Calendar } = (window as any).antd;

const dayjs = (window as any).dayjs;

// ==== antd example ==== //

const ReactGridLayout = (window as any).ReactGridLayout;

const ReactWindow = (window as any).ReactWindow;

const { WidthProvider } = ReactGridLayout;

const { VariableSizeList } = ReactWindow;

const WithReactGridLayout = WidthProvider(ReactGridLayout);

const originalLayout = [];

const useTime = () => {
  const [time, setTime] = useState(new Date().toString());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toString());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 25 + Math.round(Math.random() * 50));

const getItemSize = index => rowHeights[index];

const Row = ({ index, style }) => (
  <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} style={style}>
    Row {index}
  </div>
);

const ReactWindowExample = () => (
  <VariableSizeList
    className="List"
    height={150}
    itemCount={1000}
    itemSize={getItemSize}
    width={300}
  >
    {Row}
  </VariableSizeList>
);

class LocalStorageLayout extends React.PureComponent<{ onLayoutChange: Function }, { layout: any }> {
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function () { },
  };
  constructor(props) {
    super(props);
    this.state = {
      layout: JSON.parse(JSON.stringify(originalLayout)),
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }
  resetLayout() {
    this.setState({
      layout: [],
    });
  }
  onLayoutChange(layout) {
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
  }
  render() {
    return (
      <div>
        <button onClick={this.resetLayout}>Reset Layout</button>
        <WithReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange}
        >
          <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0 }}>
            <span className="text">1</span>
          </div>
          <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0 }}>
            <span className="text">2</span>
          </div>
          <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0 }}>
            <span className="text">3</span>
          </div>
          <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0 }}>
            <span className="text">4</span>
          </div>
          <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0 }}>
            <span className="text">5</span>
          </div>
        </WithReactGridLayout>
      </div>
    );
  }
}

const onChange = (time: any, timeString: string) => {
  console.log(time, timeString);
};

const AntdModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}

const AntdNotification = () => {
  const openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  return (
    <Button type="primary" onClick={openNotification}>
      Open the notification box
    </Button>
  )
}

const MemoCalendar = memo(Calendar);

const App = () => {
  const time = useTime();

  return <div>
    <div>
      <div>
        <h2>MyReact timer</h2>
        <p>Time: {time}</p>
      </div>
      <hr />
      <h1>MyReact Antd example</h1>
      <TimePicker onChange={onChange} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
      <br />
      <br />
      <AntdModal />
      <br />
      <br />
      <AntdNotification />
      <br />
      <br />
      <div style={{ maxWidth: '600px', border: '2px solid blue', borderRadius: '4px', padding: '3px' }}>
        <MemoCalendar />
      </div>
    </div>
    <div>
      <h1>MyReact reactive api example</h1>
      <TestReactive />
      <MemoTestReactive isMemo />
      <ReactiveHook>
        {({timeRef, position: {x, y}}) => <div>
          <h3>reactive hook</h3>
          <p>ref time:  {timeRef}</p>
          <p>reactive position: {x}: {y} </p>
        </div>}
      </ReactiveHook>
    </div>
    <hr />
    <div>
      <h2>MyReact window example</h2>
      <ReactWindowExample />
    </div>
    <hr />
    <div>
      <h2>MyReact Grid Layout example</h2>
      <LocalStorageLayout />
    </div>
  </div>
}

ReactDOM.render(<App />, document.querySelector("#root"));
`,
  },
  "main.css": {
    id: "main",
    name: "main.css",
    language: "css",
    content: `
body {
  padding-left: 4px;
}
#content {
  width: 100%;
}
.react-grid-layout {
  background: #eee;
  margin-top: 10px;
}
.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}
.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}
.react-grid-item {
  box-sizing: border-box;
}
.react-grid-item:not(.react-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}
.react-grid-item.resizing {
  opacity: 0.9;
}
.react-grid-item.static {
  background: #cce;
}
.react-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 24px;
}
.react-grid-item .minMax {
  font-size: 12px;
}
.react-grid-item .add {
  cursor: pointer;
}
.react-grid-dragHandleExample {
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}
.toolbox {
  background-color: #dfd;
  width: 100%;
  height: 120px;
  overflow: scroll;
}
.hide-button {
  cursor: pointer;
  position: absolute;
  font-size: 20px;
  top: 0px;
  right: 5px;
}
.toolbox__title {
  font-size: 24px;
  margin-bottom: 5px;
}
.toolbox__items {
  display: block;
}
.toolbox__items__item {
  display: inline-block;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  padding: 10px;
  margin: 5px;
  border: 1px solid black;
  background-color: #ddd;
}
.droppable-element {
  width: 150px;
  text-align: center;
  background: #fdd;
  border: 1px solid black;
  margin: 10px 0;
  padding: 10px;
}
    `,
  },
  "style.css": {
    id: "style",
    name: "style.css",
    language: "css",
    content: `
.react-grid-layout {
  position: relative;
  transition: height 200ms ease;
}
.react-grid-item {
  transition: all 200ms ease;
  transition-property: left, top;
}
.react-grid-item img {
  pointer-events: none;
  user-select: none;
}
.react-grid-item.cssTransforms {
  transition-property: transform;
}
.react-grid-item.resizing {
  z-index: 1;
  will-change: width, height;
}
.react-grid-item.react-draggable-dragging {
  transition: none;
  z-index: 3;
  will-change: transform;
}
.react-grid-item.dropping {
  visibility: hidden;
}
.react-grid-item.react-grid-placeholder {
  background: red;
  opacity: 0.2;
  transition-duration: 100ms;
  z-index: 2;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.react-grid-item > .react-resizable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
}
.react-grid-item > .react-resizable-handle::after {
  content: "";
  position: absolute;
  right: 3px;
  bottom: 3px;
  width: 5px;
  height: 5px;
  border-right: 2px solid rgba(0, 0, 0, 0.4);
  border-bottom: 2px solid rgba(0, 0, 0, 0.4);
}
.react-resizable-hide > .react-resizable-handle {
  display: none;
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-sw {
  bottom: 0;
  left: 0;
  cursor: sw-resize;
  transform: rotate(90deg);
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-se {
  bottom: 0;
  right: 0;
  cursor: se-resize;
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-nw {
  top: 0;
  left: 0;
  cursor: nw-resize;
  transform: rotate(180deg);
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-ne {
  top: 0;
  right: 0;
  cursor: ne-resize;
  transform: rotate(270deg);
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-w,
.react-grid-item > .react-resizable-handle.react-resizable-handle-e {
  top: 50%;
  margin-top: -10px;
  cursor: ew-resize;
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-w {
  left: 0;
  transform: rotate(135deg);
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-e {
  right: 0;
  transform: rotate(315deg);
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-n,
.react-grid-item > .react-resizable-handle.react-resizable-handle-s {
  left: 50%;
  margin-left: -10px;
  cursor: ns-resize;
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-n {
  top: 0;
  transform: rotate(225deg);
}
.react-grid-item > .react-resizable-handle.react-resizable-handle-s {
  bottom: 0;
  transform: rotate(45deg);
}
.List {
  border: 1px solid #d9dddd;
}

.ListItemEven,
.ListItemOdd {
  display: flex;
  align-items: center;
  justify-content: center;
}

.ListItemEven {
  background-color: #f8f8f0;
}
  `,
  },
  "index.html": {
    id: "main",
    name: "index.html",
    language: "html",
    content: `<h1 style='text-align: center;' >Play MyReact, open devtools to debug</h1> <div id='root'>
      <style>
        @keyframes loading {
          0% {
            transform: rotate(0deg)
          }

          50% {
            transform: rotate(180deg)
          }

          100% {
            transform: rotate(360deg)
          }
        }

        .loadingBlock {
          position: absolute;
          width: 80px;
          height: 80px;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          border-radius: 50%;
          animation: 1s loading linear infinite;
          background: gray;
        }

        .loadingBlock::before {
          content: '';
          position: absolute;
          width: 80%;
          height: 80%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background: white;
          border-radius: 50%;
        }

        .loadingBlock::after {
          content: '';
          position: absolute;
          width: 0;
          height: 0;
          border: 40px solid;
          border-color: transparent white transparent transparent;
          border-left: 10px;
          left: 60%;
          top: 50%;
          transform: translateY(-50%);
        }
      </style>
      <div class='loadingBlock'></div>
    </div>`,
  },
};
