import HomeIcon from '@/assets/icons/Home.svg';
import DocumentIcon from '@/assets/icons/description_24dp_FILL0_wght400_GRAD0_opsz24.svg';
import Rest from '@/assets/icons/captive_portal_24dp_FILL0_wght400_GRAD0_opsz24.svg'



export const SideBarLinks = [
    {
        name: "Home",
        path: "/",
        imgURL: HomeIcon,
    },
    {
        name: "Rest Client",
        path: "/rest",
        imgURL: Rest,
    },
    {
        name: "Currículo",
        path: "/curriculo",
        imgURL: DocumentIcon,
    },
    {
        name: "GitHub",
        path: "https://github.com/gabrielAnacletoo",
        imgURL: "https://avatars.githubusercontent.com/u/109560707?v=4",
    }
]