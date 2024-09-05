interface User {
    id_user: string;
    name: string;
    email: string;
}

interface Chat {
    id_chat: string;
    id_user1: string;
    id_user2: string;
    created_at: string;
    name: string;
}

interface Message {
    id_message: string;
    id_chat: string;
    id_sender: string;
    name: string;
    content: string;
    created_at: string;
}
