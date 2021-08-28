const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
    {
        id: {
            type: Number
        },
        proposedProfile: {
            id: {
                type: Number
            },
            usersData: {
                id: {
                    type: Number
                },
                email: {
                    type: String
                },
                gender: {
                    type: Number
                },
                disabled: {
                    type: Boolean
                }
            },
            googleMapPlace: {
                id: {
                    type: Number
                },
                placeId: {
                    type: String
                },
                placeName: {
                    type: String
                },
                street: {
                    type: String
                },
                route: {
                    type: String
                },
                cp: {
                    type: String
                },
                city: {
                    type: String
                },
                other: {
                    type: String
                },
                country: {
                    type: String
                },
                state: {
                    type: String
                }
            },
            name: {
                type: String
            },
            age: {
                type: Number
            },
            activity: {
                type: String
            },
            phoneNumber: {
                type: String
            },
            description: {
                type: String
            },
            picturePath: {
                type: String
            }
        },
        proposedFor: {
            id: {
                type: Number
            },
            usersData: {
                id: {
                    type: Number
                },
                email: {
                    type: String
                },
                gender: {
                    type: Number
                },
                disabled: {
                    type: Boolean
                }
            },
            googleMapPlace: {
                type: String
            },
            name: {
                type: String
            },
            age: {
                type: Number
            },
            activity: {
                type: String
            },
            phoneNumber: {
                type: String
            },
            description: {
                type: String
            },
            picturePath: {
                type: String
            }
        },
        date: {
            type: Number
        }
    }
);

module.exports = mongoose.model("Profile", profileSchema);