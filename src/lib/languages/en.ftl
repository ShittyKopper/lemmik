navbar-skip = Skip to content
navbar-login = Log In
navbar-settings = Settings

navbar-noscript = Logging in and certain other functionality requires JavaScript. You can still browse anonymously.

postriver-item-score = Current score: {$score}
postriver-item-upvote = { $voted -> 
    [true] Upvoted
    *[false] Upvote
}

postriver-item-downvote = { $voted -> 
    [true] Downvoted
    *[false] Downvote
}

postriver-item-byline =
    submitted <span data-l10n-name="time">{$time}</span> ago
    by <a data-l10n-name="user">{$user}</a>
    to <a data-l10n-name="community">{$community}</a>

postriver-item-comments = { $count ->
     [one] 1 comment
    *[other] {$count} comments
}

postriver-item-save = { $saved ->
     [true] saved
    *[false] save
}

postriver-item-xpost = crosspost
postriver-item-report = report