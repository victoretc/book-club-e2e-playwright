// Auto-generated — do not edit manually
// Run: npm run generate:api
export const fixtures = {
  "BookReview": {
    "id": 202,
    "club": -103,
    "user": {
      "id": 705,
      "username": "lJsP"
    },
    "review": "Dp2UtmFQL",
    "assessment": 1,
    "readPages": -125490682,
    "created": "2025-01-19T00:16:03Z",
    "modified": "2005-10-17T00:10:50Z"
  },
  "BookReviewRequest": {
    "club": 202,
    "review": "0PkGq",
    "assessment": 4,
    "readPages": 1569701662
  },
  "Club": {
    "id": 202,
    "bookTitle": "0PkGqM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlGYh9I4AJuKuTsB0R93AHsgRtW4fDYi8lRRnzkOumM2uX",
    "bookAuthors": "i1waTN24mLElcRRsrubn9J9kkIsyAzQyu3uELHKoustPnkRthtcJmDxS4YBj1G03BjMYmyH9E10UdekFPV9YNZ0LvB2Qv6Mu0jwb",
    "publicationYear": -1780253595,
    "description": "T72CRiq",
    "telegramChatLink": "https://example.com/users",
    "owner": 138,
    "members": [
      {
        "id": 433,
        "username": "0nSI",
        "firstName": "DCAutjFqGHOBiaj6e1AFgYdwoRIf7UOXIXGkefdqPPI8byurZHm67qG15QJYtEUIQI",
        "lastName": "79VtNP1x2t2zvHZM1Qjr7ErNVTSl03HDeE3PABMSGckghxZZQfcqRq1M43vgMoDrqSGEKgWQ4hdcvoo9K0",
        "email": "charlie649@example.com"
      }
    ],
    "reviews": [
      {
        "id": 470,
        "club": 598,
        "user": {
          "id": -248,
          "username": "0H"
        },
        "review": "f",
        "assessment": 4,
        "readPages": -293658277,
        "created": "2026-10-16T22:10:08Z",
        "modified": "2017-09-07T18:14:08Z"
      }
    ],
    "created": "2020-08-18T04:55:31Z",
    "modified": "2023-01-30T13:17:02Z"
  },
  "ClubRequest": {
    "bookTitle": "B0PkGqM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlGYh9I4AJuKuTsB0R93AHsgRtW4fDYi8lRRnzkOumM2uXyi1waTN24mLElcRRsrubn9J9kkIsyAzQyu3uELH",
    "bookAuthors": "oustPnkRthtcJmDxS4YBj1G03BjMYmyH9E10UdekFPV9YNZ0LvB2Qv6Mu0jwbfOT72CRiqicsBJSXWmPGBDCAutjFqGHOBiaj6e1AFgYdwoRIf7UOXIXGkefdqPPI8byurZHm67qG15QJYtEUIQIH79",
    "publicationYear": 1144873776,
    "description": "NP1x",
    "telegramChatLink": "https://example.com/users/users/items"
  },
  "Member": {
    "id": 202,
    "username": "5Sl",
    "firstName": "qM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlGYh9I4AJuKuTs",
    "lastName": "0R93AHsgRtW4fDYi8lRRnzkOumM2uXyi1waTN24mLElcRRsrubn9J9kkIsyAzQyu3uE",
    "email": "eve546@demo.net"
  },
  "MemberRequest": {
    "username": "E5Sl",
    "firstName": "qM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlGYh9I4AJuKuTs",
    "lastName": "0R93AHsgRtW4fDYi8lRRnzkOumM2uXyi1waTN24mLElcRRsrubn9J9kkIsyAzQyu3uE",
    "email": "eve546@demo.net"
  },
  "PaginatedBookReviewList": {
    "count": 123,
    "next": "http://api.example.org/accounts/?page=4",
    "previous": "http://api.example.org/accounts/?page=2",
    "results": [
      {
        "id": 202,
        "club": -103,
        "user": {
          "id": 705,
          "username": "lJsP"
        },
        "review": "Dp2UtmFQL",
        "assessment": 1,
        "readPages": -125490682,
        "created": "2025-01-19T00:16:03Z",
        "modified": "2005-10-17T00:10:50Z"
      }
    ]
  },
  "PaginatedClubList": {
    "count": 123,
    "next": "http://api.example.org/accounts/?page=4",
    "previous": "http://api.example.org/accounts/?page=2",
    "results": [
      {
        "id": 202,
        "bookTitle": "0PkGqM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlGYh9I4AJuKuTsB0R93AHsgRtW4fDYi8lRRnzkOumM2uX",
        "bookAuthors": "i1waTN24mLElcRRsrubn9J9kkIsyAzQyu3uELHKoustPnkRthtcJmDxS4YBj1G03BjMYmyH9E10UdekFPV9YNZ0LvB2Qv6Mu0jwb",
        "publicationYear": -1780253595,
        "description": "T72CRiq",
        "telegramChatLink": "https://example.com/users",
        "owner": 138,
        "members": [
          {
            "id": 433,
            "username": "0nSI",
            "firstName": "DCAutjFqGHOBiaj6e1AFgYdwoRIf7UOXIXGkefdqPPI8byurZHm67qG15QJYtEUIQI",
            "lastName": "79VtNP1x2t2zvHZM1Qjr7ErNVTSl03HDeE3PABMSGckghxZZQfcqRq1M43vgMoDrqSGEKgWQ4hdcvoo9K0",
            "email": "charlie649@example.com"
          }
        ],
        "reviews": [
          {
            "id": 470,
            "club": 598,
            "user": -591,
            "review": "FifVA1XE",
            "assessment": 5,
            "readPages": -1394072233,
            "created": "2004-07-21T04:46:14Z",
            "modified": "2004-08-19T13:12:55Z"
          }
        ],
        "created": "2016-09-02T22:34:17Z",
        "modified": "2001-04-22T18:15:51Z"
      }
    ]
  },
  "PatchedBookReviewRequest": {
    "club": 202,
    "review": "0PkGq",
    "assessment": 4,
    "readPages": 1569701662
  },
  "PatchedClubRequest": {
    "bookTitle": "B0PkGqM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlGYh9I4AJuKuTsB0R93AHsgRtW4fDYi8lRRnzkOumM2uXyi1waTN24mLElcRRsrubn9J9kkIsyAzQyu3uELH",
    "bookAuthors": "oustPnkRthtcJmDxS4YBj1G03BjMYmyH9E10UdekFPV9YNZ0LvB2Qv6Mu0jwbfOT72CRiqicsBJSXWmPGBDCAutjFqGHOBiaj6e1AFgYdwoRIf7UOXIXGkefdqPPI8byurZHm67qG15QJYtEUIQIH79",
    "publicationYear": 1144873776,
    "description": "NP1x",
    "telegramChatLink": "https://example.com/users/users/items"
  },
  "PatchedUserRequest": {
    "username": "E5Sl",
    "firstName": "qM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlGYh9I4AJuKuTs",
    "lastName": "0R93AHsgRtW4fDYi8lRRnzkOumM2uXyi1waTN24mLElcRRsrubn9J9kkIsyAzQyu3uE",
    "email": "eve546@demo.net"
  },
  "RequestCode": {
    "detail": "B0PkGq"
  },
  "RequestCodeRequest": {
    "email": "eve448@sample.io"
  },
  "RetrieveCodeRequest": {
    "email": "eve448@sample.io"
  },
  "RetrieveCodeResponse": {
    "code": "B0P"
  },
  "TokenBlacklistRequest": {
    "refresh": "B0PkGqM"
  },
  "TokenObtainPairWithProperMessage": {
    "access": "B0PkGq",
    "refresh": "1Dp2Ut"
  },
  "TokenObtainPairWithProperMessageRequest": {
    "username": "B0PkGqM",
    "password": "Dp2UtmFQLa"
  },
  "TokenRefresh": {
    "access": "B0PkGq",
    "refresh": "1Dp2Ut"
  },
  "TokenRefreshRequest": {
    "refresh": "B0PkGqM"
  },
  "User": {
    "id": 202,
    "username": "5Sl"
  },
  "UserRegister": {
    "username": "E5Sl",
    "password": "qM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlG"
  },
  "UserRegisterRequest": {
    "username": "E5Sl",
    "password": "qM1Dp2UtmFQLaDZdKbqdlWGbk0EYtBcdIKpOmsT1FmrseOQQ5f6A6igawDL3eS5rRlGY"
  },
  "UserRequest": {
    "username": "E5Sl"
  },
  "VerifyCode": {
    "access": "B0PkGq",
    "refresh": "1Dp2Ut"
  },
  "VerifyCodeRequest": {
    "email": "eve448@sample.io",
    "code": "kGqM"
  }
} as const;
