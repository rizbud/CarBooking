import { Dimensions } from 'react-native'

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

export default {
    // width & height
    "w-launchImage": { width },
    "h-launchImage": { height: width - 150 },
    "h-media": { height: width - 100 },

    // font family
    "ubuntu-medium": { fontFamily: "Ubuntu-Medium" },
    "ubuntu-regular": { fontFamily: "Ubuntu" },
}