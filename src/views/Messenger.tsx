import React, {useEffect, useState} from 'react';
import {io} from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:3000'; // Thay đổi URL nếu cần

const Messenger: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('user') as string) as User || {};
    const [indexChat, setIndexChat] = useState(-1);
    const [chatsList, setChatsList] = useState<Chat[]>([]);
    const [usersList, setUsersList] = useState<User[]>([])
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const socket = io(SOCKET_SERVER_URL);

    useEffect(
        () => {
            socket.connect();
            const messageHandler = (message: Message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            };

            socket.on('message', messageHandler);

            return () => {
                socket.off('message', messageHandler);
                socket.disconnect();
            }
        },
        []
    )

    useEffect(() => {
        fetch('http://localhost:3000/api/users', {
            method: 'GET',
            headers: {
                contentType: 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                setUsersList(response.data as User[])
            })

        fetch(`http://localhost:3000/api/chats?id_user=${user.id_user}`, {
            method: 'GET',
            headers: {
                contentType: 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                setChatsList(response.data as Chat[]);
            })


    }, []);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (input && indexChat !== -1) {
            const newMessage = {
                id_sender: user.id_user,
                id_chat: chatsList[indexChat].id_chat,
                content: input.trim(),
            }
            socket.emit('message', {
                ...newMessage
            });
            setInput('');
        }
    };

    const handleClickChat = (index: number) => {
        setIndexChat(index);
        fetch(`http://localhost:3000/api/messages?id_chat=${chatsList[index].id_chat}`, {
            method: 'GET',
            headers: {
                contentType: 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                if (response.data) {
                    setMessages(response.data as Message[]);
                }
            })
    }

    useEffect(() => {
        console.log(messages);
    }, [messages])

    return (
        <div className="flex h-screen bg-gray-100">
            <div className="w-1/4 p-4 border-r border-gray-300">
                <h2 className="text-lg font-semibold mb-4">Đoạn chat của bạn</h2>
                <ul className="space-y-2">
                    {chatsList && chatsList.map((chat, index) => (
                        <li
                            key={index}
                            className={`p-2 rounded-md cursor-pointer hover:bg-gray-200`}
                            onClick={() => handleClickChat(index)}
                        >
                            {chat.name}
                        </li>
                    ))}
                </ul>
                <h2 className="text-lg font-semibold mb-4">Người dùng</h2>
                <ul className="space-y-2">
                    {usersList && usersList.map((user, index) => (
                        <li
                            key={index}
                            className={`p-2 rounded-md cursor-pointer hover:bg-gray-200`}
                        >
                            {user.name}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Khung tin nhắn */}
            <div className="flex-1 p-4">
                {indexChat !== -1 ? (
                    <>
                        <h2 className="text-lg font-semibold mb-4">Trò chuyện với {chatsList[indexChat].name}</h2>
                        <div className="bg-white p-4 rounded-md shadow-md h-3/4 overflow-auto">
                            <div className="space-y-2">
                                {messages.map((message, index) => (
                                    <div key={index}
                                         className={`w-max ${user.id_user === message.id_sender ? 'ml-auto' : ''}`}>
                                        <div
                                            className={`p-2 text-xl rounded-md w-max text-white ${user.id_user === message.id_sender ? 'bg-blue-500' : 'bg-orange-500'}`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSendMessage} className="mt-4 flex">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className="flex-1 border border-gray-300 rounded-md p-2"
                                placeholder="Nhập tin nhắn..."
                                required
                            />
                            <button
                                type="submit"
                                className="ml-2 bg-blue-500 text-white rounded-md px-4 py-2"
                            >
                                Gửi
                            </button>
                        </form>
                    </>
                ) : (
                    <div className="text-center text-gray-500">Chọn một người dùng để bắt đầu trò chuyện.</div>
                )}
            </div>
        </div>
    );
};

export default Messenger;
