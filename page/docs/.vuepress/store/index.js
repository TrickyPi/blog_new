let $GobalUser = {
    name: "",
    avatar: ""
};

export const getGobalUser = () => {
    const { name, avatar } = $GobalUser;
    if (!name && !avatar) {
        const localName = window.localStorage.getItem("visitor_name") || "";
        const localAvatar = window.localStorage.getItem("visitor_avatar") || "";
        $GobalUser = {
            name: localName,
            avatar: localAvatar
        };
    }
    return { ...$GobalUser };
};

export const setGobalUser = (name, avatar) => {
    window.localStorage.setItem("visitor_name", name);
    window.localStorage.setItem("visitor_avatar", avatar);
    $GobalUser = {
        name,
        avatar
    };
};
