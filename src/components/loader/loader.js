import { RevolvingDot } from "react-loader-spinner"

const Loader = () => {
    return (
        <article className="vh-100 dt w-100">
            <div className="dtc v-mid tc white ph3 ph4-l center">
                <RevolvingDot wrapperClass="center" color="#ff5EDf" secondaryColor="#04C8DE" visible={true} />
            </div>
        </article>
    )
}

export default Loader