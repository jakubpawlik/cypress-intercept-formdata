const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

const getFormDataFromRequest = (body) => {
	return arrayBufferToBase64(body)
};

const interceptFormData = (request) => {
	const { body, headers } = request;
	const contentType = headers["content-type"];
	const boundaryMatch = contentType.match(/boundary=([\w-]+)/);
	const boundary = boundaryMatch && boundaryMatch[1];

	return getFormDataFromRequest(body, boundary);
};

export default interceptFormData;
