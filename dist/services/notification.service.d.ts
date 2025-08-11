export interface UserPreference {
    user_id: string;
    notifications: {
        email_enabled: boolean;
        sms_enabled: boolean;
        push_enabled: boolean;
    };
    privacy: {
        profileVisibility: 'public' | 'private' | 'friends';
        dataSharing: boolean;
    };
    timezone: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface NotificationEvent {
    user_id: string;
    type: 'login' | 'logout' | 'reminder' | 'otp' | 'signup' | 'update_profile' | 'delete_account';
    method: 'web' | 'mobile' | 'email' | 'sms' | 'push';
    status: 'success' | 'queued' | 'failure' | 'pending';
    metadata: Record<string, any>;
    sent_at?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare const sendEmail: (event: NotificationEvent, prefs: UserPreference) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
//# sourceMappingURL=notification.service.d.ts.map