

export function CustomImg({ imgName }) {

    const style = {
        width: "100vw",
        height: "100vh"
    };

    return (<>
        <img style={style} src={imgName} />
    </>)
}