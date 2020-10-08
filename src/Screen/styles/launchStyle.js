import { connect } from '../../themes/OsmiProvider'

export default connect({
    container: 'flex bg-white items-center justify-center',
    body: 'flex items-center justify-center',
    launchImage: 'w-launchImage h-launchImage my-2 mx-5',
    title: 'text-5xl m-2',
    caption: 'ubuntu-regular text-base my-2 mx-7 text-center',
    button: 'bg-red-500 py-2 px-5 rounded-lg m-2',
    buttonText: 'text-white text-base ubuntu-medium',
    media: 'full h-media'
})