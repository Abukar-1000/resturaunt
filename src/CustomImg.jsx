

export function CustomImg({ imgName }) {

    const style = {
        marginRight: "10vw",
        width: "100vw",
        height: "100vh"
    };

    return (<>
        <img style={style} src={imgName} />
    </>)
}