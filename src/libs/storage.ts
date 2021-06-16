// export interface EmotionProps {
//     id: string;
//     name: string;
// }

export interface ActivityProps {
    id: string;
    name: string;
    about: string;
    activity_tips: string;
    photo: string;
    period: [string];
    frequency: {
        times: string;
        repeat_every: string;
    };
    hour: string;
    dateTimeNotification: Date;
}


// Notes
// EmotionProps não precisa estar aqui pois não vai ter o processo
// de salvar que nem Activity
