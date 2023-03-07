
import axios from 'axios'
import { useEffect, useState } from "react"
export const ProjectFilesById = (url, taskId, selectedTask) => {
    const [loading, setLoading] = useState(true)
    const [qrcode, setQrcode] = useState("")

    useEffect(() => {
        let source = axios.CancelToken.source();
        const fetchProjectFileById = async (url) => {

            try {
                setLoading(true)
                const fileJson = await axios.get(url, {
                    cancelToken: source.token
                })
                const resp = fileJson.data;
                const taskIndex = resp.project_tasks.findIndex(task => task.id == taskId)
                const getQrcodeByIndex = resp.project_tasks[taskIndex].qr_code_base64
                setQrcode(getQrcodeByIndex)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchProjectFileById(url);

        const cleanUp = () => {
            setLoading(false)
            setQrcode('')
            if (source) {
                console.log('canceled');
                source.cancel("Landing Component got unmounted");
            }
        }

        return cleanUp;

    }, [selectedTask])

    return { loading, qrcode }
}