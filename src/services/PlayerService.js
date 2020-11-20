import http from '../http-common';

export const getAll = () => {

    return http.get("/players");
};

export const get = (id) => {

    return http.get(`/players/${id}`);
};

export const create = (data) => {

    return http.post("/players", data);
};

export const update = (id, data) => {

    return http.put(`/players/${id}`, data);
};

export const remove = (id) => {

    return http.delete(`/players/${id}`);
};

export const removeAll = () => {

    return http.delete("/players");
};

export const findByTitle = (title) => {

    return http.get(`/players?title=${title}`);
};


