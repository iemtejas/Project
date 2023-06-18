// Created by Tejas Sharma

// Variables for user input and conversation flow
var shouldSearch = false; // Flag indicating whether a search should be performed
var searchQ = ""; // Stores the search query
var askedAbout = false; // Flag indicating whether the bot asked about the search query

var botAsked = false; // Flag indicating whether the bot asked a question
var botQSub = ""; // Stores the bot's question
var canAsk = true; // Flag indicating whether the bot can ask a question
var qIndex = 0; // Index of the current question
var askingFirst = true; // Flag indicating if it's the first question
var questions = [ // Array of questions
  "What is your name?",
  "Where do you live?",
  "Are you a man or a woman?",
  "What have you taken today as breakfast?",
  "What is your favorite programming language?",
  "Do you love gaming?",
  "What's the title of the last book you read?",
  "Are you married?",
  "Whom do you love most?",
  "How many teeth are seen when you smile?"
];
var questionsUser = questions.concat(["How do you laugh?"]); // Array of questions with an additional user question
var qAnswers = [ // Array of corresponding answers to the questions
  "I have no name!",
  "I don't need any place to live.",
  "I am a male robot.",
  "I don't take any meal.",
  "I love Python, although I'm not programmed in Python.",
  "Of course, I love it.",
  "A robot never reads any book!",
  "Not yet.",
  "Of course, my creator - Tejas Sharma.",
  "Probably all of them.",
  "All of my teeth are visible when I smile!"
];
var dist = 0; // Distance variable
var aff = [ // Array of affirmative responses
  "yes", "yup", "yep", "hm", "ok", "of course", "yeah"
];
var neg = [ // Array of negative responses
  "no", "never", "not", "later"
];
var qAsked = 0; // Counter for the number of questions asked
var userMale; // Flag indicating the user's gender
var possibleNextQ = ""; // Stores the possible next question

var userName = ""; // Stores the user's name

var streakNum = 0; // Streak counter
var answered = false; // Flag indicating if a question has been answered
var last; // Stores the last question

// Function to check if a string starts with a given argument
String.prototype.startsWith = function(arg) {
  for (var i = 0; i < arg.length; i++) {
    if (arg[i] != this[i]) {
      return false;
    }
  }
  return true;
}

// Function to check if a string ends with a given argument
String.prototype.endsWith = function(arg) {
  for (var i = this.length - arg.length - 1; i < this.length; i++) {
    if (arg[i] != this[i]) {
      return false;
    }
  }
  return true;
}

window.onload = function() {
  // Adjust the height of the message container based on the window size
  document.getElementById("messages").style.height = window.innerHeight - document.getElementById("msg").offsetHeight - 30 + "px";
  // Adjust the width of the input field based on the window size
  document.getElementById("msg").style.width = window.innerWidth - document.getElementById("sendIcon").offsetWidth - 25 + "px";
  
  // Event listener for the enter key press
  document.getElementById("msg").addEventListener("keyup", function(e) {
    if (e.keyCode == 13 && this.value != "") {
      send();
    }
  });
}

function send() {
  var input = document.getElementById("msg").value;
  if (input == '') {
    return;
  }
  sendMsg(input, true);
  reply(input);
  document.getElementById("msg").value = "";

  // Blur the input field if the window height is too small
  if (window.innerHeight < 150) {
    document.getElementById("msg").blur();
  }
}

window.onresize = function() {
  // Adjust the width of the input field based on the window size
  document.getElementById("msg").style.width = window.innerWidth - document.getElementById("sendIcon").offsetWidth - 25 + "px";
  // Adjust the height of the message container based on the window size
  document.getElementById("messages").style.height = window.innerHeight - document.getElementById("msg").offsetHeight - 30 + "px";
}

/**
 * 
 * @param {String} msg 
 */
function reply(msg) {

    canAsk = false;
    var greetings = ["hi", "hello", "hey", "good morning", "good evening", "good afternoon"];
    var greetingsRep = ["Hello!", "Hi !", "Hi!!", "Good morning!", "Good evening!", "Good Afternoon!"];
    var appreciations = ["nice", "cool", "amazing", "superb", "good", "awesome", "magnificent", "enjoyable", "wonderful", "pleasent", "lovely", "good-looking", "amusing", "excellent", "splendid", "fantastic", "great", "mind-blowing", "outstanding", "impressive", "breath-taking", "fabulous", "remarkable", "beautiful","intelligent","smart"];
    if (msg.toLowerCase().startsWith("eval:")) {
        sendMsg("Evaluted");
        eval(msg.replace("eval:", ""));
        return;
    }
    msg = msg.toLowerCase().replace("by the way", "").replace("anyway", "").replace("whatever " ,"").replace("but ","").replace("so ","").replace(',', '');

    while (msg.startsWith(' '))
        msg = msg.slice(1, msg.length);

    

    if (shouldSearch) {
        canAsk = false;
        if (containsItem(aff, msg)) {
            search(searchQ);
            searchQ = "";
            shouldSearch = false;
        }
        else if (containsItem(neg, msg)) {
            sendMsg("OK..");
            searchQ = "";
            shouldSearch = false;
        }
        else sendMsg("Sorry ?");
    }
 
    else if (msg.startsWith("can you tell me"))
    {
        reply(msg.replace("can you tell me ", ""));
        return;
    }
    else if (msg.startsWith("do you know"))
    {
        reply(msg.replace("do you know ", ""));
        return;
    }
    else if (msg.startsWith("haha")) {
        var reps = ["I love to make people laugh", "I made you laugh!!", "I am seeing your teeth!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    if (msg.startsWith("wow")) {
        var reps = ["I know it's amazing"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bstupid\b|\bmoron\b|\bdimwit\b/.test(msg)) {
        var reps = ["Let's keep the conversation respectful.", "Please refrain from using offensive language.", "We can have a constructive discussion without insults.", "Kindness goes a long way.", "I'm here to assist you, so let's stay positive.", "Let's focus on finding a solution."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bdisgusting\b|\brepulsive\b|\brevolting\b/.test(msg)) {
        var reps = ["Let's try to maintain a respectful dialogue.", "We can express our opinions without being offensive.", "Please choose words that foster a positive environment.", "I'm here to assist you, so let's focus on finding a solution.", "Kindness and understanding can go a long way.", "Let's maintain a civil conversation."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\boffensive\b|\binsulting\b|\bderogatory\b/.test(msg)) {
        var reps = ["Please avoid using offensive language.", "Let's strive for a respectful conversation.", "We can have a productive discussion without resorting to insults.", "I'm here to assist you, so let's focus on finding a solution.", "Kindness and empathy are important in our interactions.", "Let's promote a positive environment."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bsexist\b|\bmisogynistic\b|\bchauvinistic\b/.test(msg)) {
      var reps = ["Let's promote equality and respect.", "Sexism has no place here.", "We should treat everyone with fairness and dignity.", "I'm here to help regardless of gender.", "Let's focus on creating an inclusive environment.", "Please be mindful of your language."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bhomophobic\b|\btransphobic\b|\bqueerphobic\b/.test(msg)) {
      var reps = ["Let's promote acceptance and inclusivity.", "Discrimination based on sexual orientation or gender identity is not acceptable.", "We should respect and support everyone's right to be themselves.", "I'm here to help regardless of sexual orientation or gender identity.", "Let's focus on creating a safe and inclusive space.", "Please be mindful of your language."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bangry\b|\bfrustrated\b|\bupset\b/.test(msg)) {
      var reps = ["I understand that you're feeling upset.", "It's okay to feel angry or frustrated.", "I'm here to listen and support you.", "Let's focus on finding a solution together.", "Take a deep breath and let's work through this.", "You're not alone in this, I'm here to help."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bdepressed\b|\bsad\b|\bdown\b/.test(msg)) {
      var reps = ["I'm sorry to hear that you're feeling this way.", "It's important to reach out for support when you're feeling down.", "Remember, you're not alone. There are people who care about you.", "Let's focus on finding strategies to help you feel better.", "Consider talking to a mental health professional about what you're going through.", "I'm here to listen and provide support."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\blonely\b|\bisolated\b|\balone\b/.test(msg)) {
      var reps = ["I'm sorry to hear that you're feeling lonely.", "Reach out to friends or family members who can provide support.", "Consider joining social groups or activities to meet new people.", "Remember, there are people who care about you and want to connect.", "I'm here to chat with you and keep you company.", "You're not alone, I'm here for you."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\banxious\b|\bworried\b|\bnervous\b/.test(msg)) {
      var reps = ["I understand that anxiety can be overwhelming.", "Take a deep breath and try to focus on the present moment.", "Consider practicing relaxation techniques like deep breathing or meditation.", "Remember, it's normal to feel anxious, and you're not alone.", "I'm here to provide support and help you manage your anxiety.", "Let's work together to find strategies that can ease your worries."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bsick\b|\bunwell\b|\bill\b/.test(msg)) {
      var reps = ["I'm sorry to hear that you're not feeling well.", "Make sure to take care of yourself and rest.", "Consider reaching out to a healthcare professional for advice.", "Drink plenty of fluids and get enough rest to help your body recover.", "I hope you feel better soon. Take it easy.", "If you have specific symptoms, it might be helpful to seek medical advice."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bconfused\b|\blost\b|\buncertain\b/.test(msg)) {
      var reps = ["It's okay to feel confused or uncertain.", "Take your time to process the information or situation.", "Consider talking to someone you trust for guidance.", "I'm here to help clarify any confusion or answer your questions.", "Let's break down the problem step by step and find a solution together.", "Remember, it's normal to feel unsure, and we can work through it."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bfat\b|\bobese\b|\bchubby\b/.test(msg)) {
      var reps = ["Let's promote body positivity and acceptance.", "Body shaming is not acceptable.", "Everyone's body is unique and beautiful.", "I'm here to support you regardless of your body size.", "Let's focus on self-love and self-care.", "Please be mindful of your language and respect others."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\blazy\b|\bunmotivated\b|\bunproductive\b/.test(msg)) {
      var reps = ["Remember, everyone has their own pace and productivity style.", "Let's focus on finding ways to stay motivated and productive.", "You're capable of achieving great things.", "I'm here to provide tips and support for your goals.", "Don't be too hard on yourself. Progress is progress, no matter how small.", "Let's find strategies to boost your motivation."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bugly\b|\bunattractive\b|\bhideous\b/.test(msg)) {
      var reps = ["Beauty is subjective, and everyone has their own unique charm.", "You are more than your physical appearance.", "Let's focus on building self-confidence and inner beauty.", "I'm here to support you and remind you of your worth.", "Kindness and positivity make someone truly attractive.", "Please be mindful of the impact your words can have on others."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bdistracted\b|\bunfocused\b|\bscatterbrained\b/.test(msg)) {
      var reps = ["It's normal to feel distracted or unfocused sometimes.", "Let's explore techniques to improve your focus and concentration.", "Consider creating a conducive environment for productivity.", "I'm here to help you stay on track and achieve your goals.", "Remember, taking breaks and self-care are essential for maintaining focus.", "Let's find strategies that work best for you."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bprocrastinate\b|\blazy\b|\bdelay\b/.test(msg)) {
      var reps = ["Procrastination can be a challenge, but it's not insurmountable.", "Let's work on overcoming procrastination and building better habits.", "Breaking tasks into smaller, manageable steps can help overcome inertia.", "I'm here to provide tips and strategies to improve your productivity.", "Remember, progress is more important than perfection.", "Let's find ways to stay motivated and avoid unnecessary delays."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bjealous\b|\benvious\b|\bcovet\b/.test(msg)) {
      var reps = ["Jealousy is a natural emotion, but let's try to manage it in a healthy way.", "Remember, comparison can hinder your own progress.", "Focus on your own journey and celebrate the successes of others.", "I'm here to support you and help you build self-confidence.", "Let's practice gratitude and appreciate what we have.", "Jealousy doesn't define you. Let's work on fostering a positive mindset."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\binsecure\b|\bunconfident\b|\bself-doubt\b/.test(msg)) {
      var reps = ["It's common to experience moments of insecurity, but remember that you're capable and deserving.", "Focus on your strengths and achievements.", "I'm here to provide support and help you build self-confidence.", "Let's work on challenging negative self-talk and embracing self-compassion.", "Surround yourself with positive influences and people who uplift you.", "Believe in yourself. You are worthy and capable."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\bbroke\b|\bpoor\b|\bfinancially struggling\b/.test(msg)) {
      var reps = ["Financial challenges can be tough, but there are resources and strategies to help.", "Let's focus on finding ways to improve your financial situation.", "Consider reaching out to financial advisors or exploring financial assistance programs.", "I'm here to provide guidance and tips for managing your finances.", "Remember, your worth is not defined by your financial status.", "Let's work on building a solid financial foundation together."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\blost job\b|\bunemployed\b|\bjobless\b/.test(msg)) {
      var reps = ["Losing a job can be challenging, but there are opportunities and support available.", "Consider updating your resume and reaching out to your network for job leads.", "I'm here to provide guidance and help you navigate the job search process.", "Focus on your skills and experience, and remember that setbacks are temporary.", "You have the resilience to overcome this challenge and find a new opportunity.", "Let's work on creating a strong job search strategy."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    if (/\bbetrayed|backstabbed|deceived\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're feeling betrayed.", "Betrayal can be painful, but healing is possible.", "Consider talking to someone you trust about what you're going through.", "I'm here to provide support and lend an ear.", "Let's focus on rebuilding trust and finding ways to move forward.", "Remember, you deserve healthy and trustworthy relationships."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bheartbroken|devastated|crushed\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're going through heartbreak.", "Give yourself time to heal and process your emotions.", "Reach out to friends or family members who can provide support.", "I'm here to listen and offer comfort during this difficult time.", "Focus on self-care and engaging in activities that bring you joy.", "Remember, you will heal and find happiness again."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\brejected|unwanted|ignored\b/.test(msg)) {
        var reps = ["Rejection can be tough, but it's not a reflection of your worth.", "Remember, there are people who appreciate and value you.", "Take this as an opportunity to focus on self-love and personal growth.", "I'm here to provide support and remind you of your strengths.", "Keep pursuing your goals and connecting with those who uplift you.", "You deserve love, acceptance, and belonging."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bbullied|harassed|intimidated\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're experiencing bullying.", "Reach out to a trusted adult, friend, or authority figure for support.", "Remember, you don't deserve to be treated this way.", "I'm here to listen and offer guidance on dealing with bullying.", "Let's focus on strategies to protect your well-being and promote kindness.", "You're strong, and we'll work through this together."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\btraumatized|PTSD|triggered\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're experiencing trauma or triggers.", "Consider seeking professional help from a therapist or counselor.", "Take your time to heal and prioritize self-care.", "I'm here to provide support and listen without judgment.", "Let's focus on finding coping mechanisms and resources that can assist you.", "Remember, healing is a journey, and you're not alone."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\baddicted|dependency|substance abuse\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're struggling with addiction or dependency.", "Consider reaching out to a professional for help and support.", "Remember, recovery is possible, and you deserve a healthy and fulfilling life.", "I'm here to provide resources and encouragement on your journey.", "You're not alone in this, and there are people who want to help you.", "Let's focus on finding strategies and support networks for your recovery."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    if (/\b(suicidal|self-harm|depression)\b/.test(msg)) {
      var reps = ["I'm really sorry to hear that you're feeling this way.", "Please reach out to a mental health professional or a helpline immediately.", "Your life is valuable, and there are people who care about you.", "Consider confiding in someone you trust for support.", "I'm here to listen and encourage you to prioritize your well-being.", "Remember, there is hope and help available."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(disrespected|insulted|offended)\b/.test(msg)) {
      var reps = ["I'm sorry to hear that you feel disrespected.", "No one deserves to be treated with disrespect.", "Consider setting boundaries and expressing your feelings to the person involved.", "I'm here to listen and offer guidance on handling such situations.", "Let's focus on assertiveness and self-advocacy.", "Remember, your feelings and experiences are valid."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(overwhelmed|stressed|burnout)\b/.test(msg)) {
      var reps = ["It sounds like you're experiencing a lot of pressure.", "Remember to prioritize self-care and take breaks when needed.", "Consider talking to someone you trust about what you're going through.", "I'm here to provide support and help you manage your stress.", "Let's explore relaxation techniques and stress management strategies.", "You don't have to face it all alone. I'm here for you."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(lonely|isolated|alone)\b/.test(msg)) {
      var reps = ["I'm sorry to hear that you're feeling lonely.", "Reach out to friends or family members who can provide support.", "Consider joining social groups or activities to meet new people.", "Remember, there are people who care about you and want to connect.", "I'm here to chat with you and keep you company.", "You're not alone, I'm here for you."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(anxious|worried|nervous)\b/.test(msg)) {
      var reps = ["I understand that anxiety can be overwhelming.", "Take a deep breath and try to focus on the present moment.", "Consider practicing relaxation techniques like deep breathing or meditation.", "Remember, it's normal to feel anxious, and you're not alone.", "I'm here to provide support and help you manage your anxiety.", "Let's work together to find strategies that can ease your worries."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(sick|unwell|ill)\b/.test(msg)) {
      var reps = ["I'm sorry to hear that you're not feeling well.", "Make sure to take care of yourself and rest.", "Consider reaching out to a healthcare professional for advice.", "Drink plenty of fluids and get enough rest to help your body recover.", "I hope you feel better soon. Take it easy.", "If you have specific symptoms, it might be helpful to seek medical advice."];
      sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(confused|lost|uncertain)\b/.test(msg)) {
        var reps = ["It's okay to feel confused or uncertain.", "Take your time to explore your thoughts and options.", "Consider talking to someone you trust for guidance.", "I'm here to provide support and help you gain clarity.", "Let's focus on breaking down the situation and finding solutions.", "Remember, you have the ability to navigate through this confusion."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(late for work|missed the bus|traffic jam)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're facing difficulties with transportation.", "Consider checking for alternative routes or modes of transportation.", "I'm here to provide suggestions on how to manage the situation.", "Focus on staying calm and exploring options to minimize the impact.", "Remember, sometimes unforeseen circumstances are beyond our control.", "Let's find ways to make your commute more manageable in the future."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(computer crashed|lost my files|technical difficulties)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're experiencing technical issues.", "Consider reaching out to technical support for assistance.", "I'm here to provide guidance on troubleshooting and data recovery.", "Let's focus on finding solutions and preventing future issues.", "Remember to back up your files regularly to avoid data loss.", "You'll overcome this setback, and I'm here to help."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(family argument|fight with siblings|parental disagreement)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that there's conflict within your family.", "Consider having open and respectful communication to address the issue.", "I'm here to provide support and guidance on resolving conflicts.", "Focus on finding common ground and understanding each other's perspectives.", "Remember, healthy relationships require effort and compromise.", "Let's work on fostering a more harmonious environment."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(feeling overwhelmed with chores|cleaning the house|laundry piling up)\b/.test(msg)) {
        var reps = ["I understand that household chores can be overwhelming.", "Consider breaking tasks into smaller, manageable steps.", "I'm here to provide tips on organizing and prioritizing your chores.", "Remember to delegate tasks if possible and ask for help when needed.", "Let's focus on creating a routine that helps you maintain a clean and organized space.", "You'll make progress, one task at a time."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(feeling uninspired|creative block|lack of motivation)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're feeling uninspired.", "Consider exploring new hobbies or activities to spark your creativity.", "I'm here to provide suggestions and support in finding inspiration.", "Focus on self-care and taking breaks to rejuvenate your mind.", "Remember, creativity comes in waves, and it's normal to have periods of low motivation.", "Let's work on finding strategies to reignite your passion."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(weight gain|struggling with fitness|unhealthy eating habits)\b/.test(msg)) {
        var reps = ["I understand that maintaining a healthy lifestyle can be challenging.", "Consider seeking guidance from a nutritionist or fitness professional.", "I'm here to provide support and tips for achieving your health goals.", "Focus on small, sustainable changes to your diet and exercise routine.", "Remember, progress is more important than perfection.", "Let's work on building a healthy relationship with food and exercise."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(feeling anxious about an exam|test anxiety|nervous before a test)\b/.test(msg)) {
        var reps = ["I understand that exams can be stressful.", "Remember to take breaks and practice self-care while studying.", "I'm here to provide tips on managing test anxiety.", "Focus on preparing to the best of your abilities and trust in your preparation.", "Remember, your worth is not solely determined by your exam results.", "Let's work on strategies to stay calm and perform your best."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(feeling overwhelmed with responsibilities|too much on my plate|juggling multiple tasks)\b/.test(msg)) {
        var reps = ["I understand that having numerous responsibilities can be overwhelming.", "Consider prioritizing tasks and breaking them down into smaller, manageable steps.", "I'm here to provide tips on time management and organization.", "Remember to delegate tasks if possible and ask for support when needed.", "Let's work on creating a balanced routine that helps you manage your responsibilities.", "You'll make progress, one task at a time."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(feeling insecure|lack of self-confidence|low self-esteem)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're feeling insecure.", "Remember that your worth is not defined by external factors.", "Focus on self-care and engaging in activities that boost your self-esteem.", "I'm here to provide support and tips on building self-confidence.", "Challenge negative thoughts and practice self-compassion.", "You are unique and deserving of love and respect."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(dealing with grief|coping with loss|mourning a loved one)\b/.test(msg)) {
        var reps = ["I'm sorry for your loss. Losing someone is incredibly difficult.", "Allow yourself to grieve and process your emotions.", "Reach out to loved ones for support or consider joining a support group.", "I'm here to provide a listening ear and resources to help you through this time.", "Remember, it's okay to seek professional help if needed.", "Take things at your own pace and be gentle with yourself."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(struggling with time management|procrastination|difficulty meeting deadlines)\b/.test(msg)) {
        var reps = ["I understand that time management can be challenging.", "Consider breaking tasks into smaller, more manageable chunks.", "I'm here to provide tips on prioritizing and setting realistic deadlines.", "Focus on eliminating distractions and creating a conducive work environment.", "Remember, it's important to find a balance between work and rest.", "Let's work on strategies to improve your time management skills."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(feeling stuck in a rut|lack of progress|monotony in life)\b/.test(msg)) {
        var reps = ["I understand that feeling stuck can be frustrating.", "Consider exploring new hobbies or activities to add variety to your routine.", "I'm here to provide suggestions and support in finding new opportunities.", "Focus on setting small goals and celebrating your achievements.", "Remember, change starts with taking small steps outside of your comfort zone.", "Let's work on finding ways to bring excitement and meaning back into your life."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(relationship issues|communication problems|trust concerns)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're experiencing difficulties in your relationship.", "Consider having open and honest communication with your partner.", "I'm here to provide guidance and support in resolving relationship issues.", "Focus on active listening and understanding each other's perspectives.", "Remember, healthy relationships require effort and compromise.", "Let's work on fostering a more fulfilling and harmonious relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(feeling stuck in a dead-end job|career dissatisfaction|lack of growth opportunities)\b/.test(msg)) {
        var reps = ["I understand that feeling unsatisfied with your job can be challenging.", "Consider exploring new career paths or acquiring new skills.", "I'm here to provide guidance and support in finding fulfilling opportunities.", "Focus on setting career goals and creating a plan to achieve them.", "Remember, it's never too late to pursue a career that aligns with your passions.", "Let's work on finding ways to make your work life more fulfilling."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(financial stress|money problems|debt concerns)\b/.test(msg)) {
        var reps = ["I understand that financial stress can be overwhelming.", "Consider creating a budget and seeking professional financial advice if needed.", "I'm here to provide tips on managing your finances and reducing debt.", "Focus on setting realistic financial goals and finding ways to save money.", "Remember, small steps towards financial stability can make a big difference.", "Let's work on strategies to improve your financial well-being."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(feeling distant from friends|social isolation|lack of social connection)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're feeling distant from your friends.", "Consider reaching out to them and organizing social activities.", "I'm here to provide suggestions on how to foster social connections.", "Focus on joining groups or clubs with similar interests.", "Remember, building and maintaining friendships takes effort from both sides.", "Let's work on finding ways to strengthen your social support network."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(still not over my ex|can't move on from my ex|thoughts of my ex)\b/.test(msg)) {
        var reps = ["I understand that moving on can be challenging.", "Consider focusing on self-care and personal growth.", "I'm here to provide support and guidance during this process.", "Focus on creating new experiences and building a fulfilling life for yourself.", "Remember, healing takes time, and it's okay to seek professional help if needed.", "Let's work on finding ways to let go and embrace new possibilities."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(dealing with a long-distance relationship|missing my partner in a long-distance relationship|struggling with the distance)\b/.test(msg)) {
        var reps = ["I understand that being in a long-distance relationship can be challenging.", "Consider setting regular communication routines and planning visits.", "I'm here to provide support and tips on maintaining a healthy long-distance relationship.", "Focus on trust, effective communication, and shared goals.", "Remember, distance can strengthen your bond if you both work together.", "Let's work on finding ways to make the distance more manageable."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(breakup advice|how to cope with a breakup|recovering from a breakup)\b/.test(msg)) {
        var reps = ["I'm sorry to hear about your breakup. It's a difficult experience.", "Give yourself time to grieve and heal from the loss.", "I'm here to provide support and guidance during this challenging time.", "Focus on self-care, surrounding yourself with loved ones, and engaging in activities that bring you joy.", "Remember, each day brings you closer to healing and finding happiness again.", "Let's work on strategies to help you navigate through this breakup."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(my partner cheated on me|infidelity in a relationship|how to rebuild trust after cheating)\b/.test(msg)) {
        var reps = ["I'm sorry to hear about the betrayal you experienced.", "Rebuilding trust takes time and open communication.", "I'm here to provide support and guidance as you navigate through this situation.", "Focus on honest conversations, setting boundaries, and seeking professional help if needed.", "Remember, forgiveness is a personal journey and not an obligation.", "Let's work on finding ways to heal and rebuild trust in your relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(losing interest in my partner|relationship feels stagnant|falling out of love)\b/.test(msg)) {
        var reps = ["I understand that relationships go through ups and downs.", "Consider reflecting on the reasons behind your feelings.", "I'm here to provide support and help you navigate through this phase.", "Focus on open communication, rekindling shared interests, and quality time together.", "Remember, relationships require effort and commitment from both partners.", "Let's work on finding ways to reignite the spark and deepen your connection."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    if (/\b(my ex blocked me|gf\/bf blocked me|blocked by my partner)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you've been blocked.", "Consider respecting their decision and giving them space.", "I'm here to provide support and help you cope with the situation.", "Focus on self-care, personal growth, and surrounding yourself with supportive people.", "Remember, closure can come from within, even without direct communication.", "Let's work on finding ways to move forward and focus on your own well-being."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(how to get my ex back|winning my ex back|rekindling a past relationship)\b/.test(msg)) {
        var reps = ["Consider reflecting on the reasons behind the breakup and what you've learned from it.", "I'm here to provide support and guidance, but it's important to respect their decision.", "Focus on personal growth, building your own happiness, and healing from the past.", "Remember, relationships require mutual effort and willingness to work through challenges.", "Let's work on finding ways to move forward and embrace new opportunities."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(unable to let go of past hurt|holding onto resentment in a relationship|forgiving my partner)\b/.test(msg)) {
        var reps = ["I understand that letting go can be difficult, especially when hurt is involved.", "Consider seeking closure through open and honest communication.", "I'm here to provide support and help you navigate through this process.", "Focus on self-reflection, practicing self-compassion, and seeking professional help if needed.", "Remember, forgiveness is a personal journey and doesn't always mean reconciliation.", "Let's work on finding ways to release the past and create a brighter future."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(feeling lonely in a relationship|lack of emotional connection with my partner|not feeling loved in a relationship)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're feeling lonely in your relationship.", "Consider having open and honest conversations with your partner about your feelings.", "I'm here to provide support and guidance in improving your emotional connection.", "Focus on quality time, affection, and understanding each other's love languages.", "Remember, relationships require effort and nurturing.", "Let's work on finding ways to strengthen the emotional bond in your relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(relationship moving too fast|taking things slow in a relationship|feeling overwhelmed in a relationship)\b/.test(msg)) {
        var reps = ["I understand that relationships can sometimes feel overwhelming.", "Consider communicating your feelings and boundaries with your partner.", "I'm here to provide support and guidance as you navigate through this situation.", "Focus on establishing a pace that feels comfortable for both of you.", "Remember, it's okay to prioritize your emotional well-being.", "Let's work on finding ways to create a healthy balance in your relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bhow to trust again after being hurt\b|\brebuilding trust in a relationship\b|\bstruggling with trust issues\b/.test(msg)) {
        var reps = ["I understand that rebuilding trust can be a challenging process.", "Consider having open and honest conversations with your partner about your feelings.", "I'm here to provide support and guidance as you navigate through this journey.", "Focus on setting realistic expectations and giving trust time to be rebuilt.", "Remember, trust is earned and requires consistent effort from both partners.", "Let's work on finding ways to heal and rebuild trust in your relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bhow to communicate better in a relationship\b|\bimproving communication with my partner\b|\bfeeling misunderstood in a relationship\b/.test(msg)) {
        var reps = ["I understand that communication is key to a healthy relationship.", "Consider practicing active listening and expressing your thoughts and feelings clearly.", "I'm here to provide tips and guidance on improving communication in your relationship.", "Focus on creating a safe and non-judgmental space for open dialogue.", "Remember, effective communication requires patience and understanding.", "Let's work on finding ways to enhance the communication dynamics in your relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bfeeling pressured to be in a relationship\b|\bsocietal expectations of being in a relationship\b|\bbeing single and feeling judged\b/.test(msg)) {
        var reps = ["I understand that societal expectations can be overwhelming.", "Consider embracing your singlehood and focusing on personal growth and self-discovery.", "I'm here to provide support and guidance in navigating societal pressures.", "Focus on creating a fulfilling life for yourself, regardless of your relationship status.", "Remember, your worth is not determined by your relationship status.", "Let's work on finding ways to embrace and celebrate your journey as a single individual."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bfeeling suffocated in a relationship\b|\black of personal space in a relationship\b|\bneed for independence\b/.test(msg)) {
        var reps = ["I understand that having personal space is important in a relationship.", "Consider having an open conversation with your partner about your needs.", "I'm here to provide support and guidance as you navigate through this situation.", "Focus on setting boundaries and finding a balance between togetherness and independence.", "Remember, healthy relationships respect the individuality of both partners.", "Let's work on finding ways to create a healthy balance in your relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bcoping with a toxic relationship\b|\bdealing with emotional abuse in a relationship\b|\btoxic patterns in my relationship\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're experiencing a toxic relationship.", "Consider prioritizing your safety and well-being.", "I'm here to provide support and resources for you.", "Focus on setting boundaries and seeking professional help if needed.", "Remember, you deserve to be in a healthy and supportive relationship.", "Let's work on finding ways to help you navigate out of this toxic situation."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bmissing my ex-girlfriend\b|\bstill have feelings for my ex-boyfriend\b|\bcan't stop thinking about my ex-partner\b/.test(msg)) {
        var reps = ["I understand that thoughts of your ex can be overwhelming.", "Consider focusing on self-care and personal growth.", "I'm here to provide support and guidance during this process.", "Focus on creating new experiences and building a fulfilling life for yourself.", "Remember, healing takes time, and it's okay to seek professional help if needed.", "Let's work on finding ways to let go and embrace new possibilities."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bmy partner doesn't understand me\b|\bfeeling misunderstood by my partner\b|\black of emotional support\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're feeling misunderstood by your partner.", "Consider having an open and honest conversation to express your feelings.", "I'm here to provide support and guidance in improving your emotional connection.", "Focus on active listening and trying to understand each other's perspectives.", "Remember, effective communication is crucial in fostering understanding.", "Let's work on finding ways to enhance the emotional connection in your relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\brelationship feels one-sided\b|\bunequal effort in a relationship\b|\bnot feeling valued by my partner\b/.test(msg)) {
        var reps = ["I understand that feeling valued and appreciated is important in a relationship.", "Consider having an open conversation with your partner about your concerns.", "I'm here to provide support and guidance as you navigate through this situation.", "Focus on setting clear expectations and finding a balance in giving and receiving.", "Remember, a healthy relationship requires mutual effort and respect.", "Let's work on finding ways to address the imbalance and improve the dynamics in your relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bhow to build a strong foundation in a relationship\b|\bcreating a healthy and lasting relationship\b|\bstarting a relationship on the right foot\b/.test(msg)) {
        var reps = ["Building a strong foundation is essential for a healthy relationship.", "Consider open communication, trust, and shared values as key pillars.", "I'm here to provide tips and guidance on cultivating a strong relationship.", "Focus on spending quality time, creating shared goals, and supporting each other's growth.", "Remember, a strong foundation is built on mutual respect and understanding.", "Let's work on laying a solid groundwork for a fulfilling and lasting relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bhow to handle a break in a relationship\b|\btaking a break from my partner\b|\brelationship pause\b/.test(msg)) {
        var reps = ["Taking a break can be a healthy step in a relationship.", "Consider having an open and honest conversation with your partner about your needs.", "I'm here to provide support and guidance as you navigate through this situation.", "Focus on self-reflection, personal growth, and setting clear boundaries during the break.", "Remember, the purpose of a break is to gain clarity and evaluate the relationship.", "Let's work on finding ways to make the break a constructive experience for both of you."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bfeeling uncertain about the future of my relationship\b|\bdoubts about the longevity of my relationship\b|\brelationship prospects\b/.test(msg)) {
        var reps = ["I understand that uncertainty about the future can be challenging.", "Consider having open and honest conversations with your partner about your concerns.", "I'm here to provide support and guidance as you navigate through this uncertainty.", "Focus on exploring your individual and shared goals to gain clarity.", "Remember, it's important to prioritize your happiness and well-being.", "Let's work on finding ways to address your concerns and find clarity about the future of your relationship."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bfalling for someone new while in a relationship\b|\bdeveloping feelings for someone outside my relationship\b|\bemotional connection with someone else\b/.test(msg)) {
        var reps = ["Experiencing feelings for someone outside your relationship can be complicated.", "Consider reflecting on the reasons behind these feelings and the impact on your current relationship.", "I'm here to provide support and guidance as you navigate through this situation.", "Focus on open and honest communication with your partner about your feelings.", "Remember, relationships require commitment and addressing any issues with honesty and integrity.", "Let's work on finding ways to understand and manage your emotions in a respectful manner."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bbreaking up with my long-distance partner\b|\bending a long-distance relationship\b|\bdifficulties in maintaining a long-distance relationship\b/.test(msg)) {
        var reps = ["Breaking up with a long-distance partner can be challenging.", "Consider having an open and honest conversation about your feelings and concerns.", "I'm here to provide support and guidance as you navigate through this decision.", "Focus on understanding the practicality and emotional aspects of your relationship.", "Remember, it's essential to prioritize your happiness and well-being.", "Let's work on finding ways to support you through the breakup and help you move forward."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bCan you please help मदद कर सकते हो क्या\b/.test(msg) || /\bI have a question सवाल है मेरे पास\b/.test(msg) || /\bI don't understand समझ नहीं आ रहा\b/.test(msg)) {
        var reps = ["ज़रूर, मैं आपकी मदद कर सकता हूँ!", "हाँ, मैं आपके सवाल का उत्तर दे सकता हूँ।", "मैं आपकी समझ में मदद करने के लिए यहाँ हूँ।"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bHow do I say 'Hello' in Hindi\?/.test(msg) || /\bTranslate 'Thank you' to Hindi\b/.test(msg) || /\bCan you teach me a Hindi word\?\b/.test(msg)) {
        var reps = ["'Hello' in Hindi is 'नमस्ते' (Namaste)", "The translation of 'Thank you' in Hindi is 'धन्यवाद' (Dhanyavaad)", "Sure! Let me teach you a Hindi word. How about 'शुभकामनाएँ' (Shubhkaamnaen)? It means 'Best wishes'."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bI love Indian culture\b/.test(msg) || /\bTell me about Bollywood\b/.test(msg) || /\bWhat are popular Indian cuisines\?\b/.test(msg)) {
        var reps = ["That's wonderful! Indian culture is rich and diverse.", "Bollywood is the Hindi film industry and is known for its vibrant movies and music.", "Indian cuisine is renowned for its flavors. Some popular cuisines include North Indian, South Indian, and Mughlai cuisine."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\bHow can I say 'Goodbye' in Hindi\?/.test(msg) || /\bTranslate 'Please' to Hindi\b/.test(msg) || /\bCan you teach me a Hindi phrase\?\b/.test(msg)) {
        var reps = ["'Goodbye' in Hindi is 'अलविदा' (Alvida)", "The translation of 'Please' in Hindi is 'कृपया' (Kripya)", "Sure! Let me teach you a Hindi phrase. How about 'धन्य होना' (Dhany hona)? It means 'Thank you'."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(I want to learn Hindi|How can I practice speaking Hindi?|Do you have any Hindi learning resources?)\b/.test(msg)) {
        var reps = ["That's great! Learning Hindi can be a rewarding experience.", "To practice speaking Hindi, try conversing with native speakers or language exchange partners.", "There are many online resources available for learning Hindi, such as language learning apps, websites, and online courses."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(Can you recommend some Hindi movies?|Tell me about popular Hindi actors|What are famous Hindi songs?)\b/.test(msg)) {
        var reps = ["Sure! Some popular Hindi movies are 'Dilwale Dulhania Le Jayenge', '3 Idiots', and 'Lagaan'.", "Hindi cinema boasts talented actors like Amitabh Bachchan, Shah Rukh Khan, and Priyanka Chopra.", "Famous Hindi songs include 'Kabhi Kabhie Mere Dil Mein' and 'Tum Hi Ho'. They are known for their beautiful melodies."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(How can I say 'I love you' in Hindi?|Translate 'Happy birthday' to Hindi|Can you teach me a Hindi expression?)\b/.test(msg)) {
        var reps = ["To say 'I love you' in Hindi, you can say 'मैं तुमसे प्यार करता/करती हूँ' (Main tumse pyar karta/karti hoon).", "The translation of 'Happy birthday' in Hindi is 'जन्मदिन मुबारक हो' (Janmdin mubarak ho).", "Sure! Let me teach you a Hindi expression. How about 'बहुत धन्यवाद' (Bahut dhanyavaad)? It means 'Thank you very much'."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(What are traditional Hindi festivals?|Tell me about Indian wedding customs|What are popular Hindi proverbs?)\b/.test(msg)) {
        var reps = ["Some traditional Hindi festivals include Diwali, Holi, and Navratri.", "Indian weddings are known for their vibrant ceremonies, rituals, and cultural traditions.", "Hindi proverbs like 'जैसा करोगे वैसा भरोगे' (Jaisa karoge vaisa bharoge) emphasize the consequences of one's actions."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(I'm planning to visit India|Tell me about famous tourist attractions in India|What are delicious Indian sweets?)\b/.test(msg)) {
        var reps = ["That's exciting! India offers a diverse range of tourist attractions, such as the Taj Mahal, Jaipur's Hawa Mahal, and Kerala's backwaters.", "Delicious Indian sweets include Gulab Jamun, Jalebi, and Rasgulla. They are a delightful part of Indian cuisine."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(Can you teach me a Hindi tongue twister\?|Translate 'Good morning' to Hindi|Tell me about Hindi literature)\b/.test(msg)) {
        var reps = ["Sure! Here's a Hindi tongue twister: 'कच्चा पापड़, पक्का पापड़. कच्चा पापड़, पक्का पापड़. कच्चा पापड़, पक्का पापड़.'", "The translation of 'Good morning' in Hindi is 'सुप्रभात' (Suprabhat).", "Hindi literature is rich and diverse, encompassing works by renowned authors like Munshi Premchand and Rabindranath Tagore."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(Tell me about Mahatma Gandhi|Who was Bhagat Singh\?|What role did Subhas Chandra Bose play in India's freedom struggle\?)\b/.test(msg)) {
        var reps = ["Mahatma Gandhi, also known as the Father of the Nation, led India's nonviolent freedom movement against British rule.", "Bhagat Singh was a revolutionary who fought for India's independence and sacrificed his life at a young age.", "Subhas Chandra Bose, popularly known as Netaji, played a crucial role in India's freedom struggle and formed the Indian National Army to fight against the British."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(Who is Lata Mangeshkar\?|Tell me about A.R. Rahman|What are some popular songs by Kishore Kumar\?)\b/.test(msg)) {
        var reps = ["Lata Mangeshkar is a renowned playback singer in the Indian film industry and has contributed to numerous Bollywood songs.", "A.R. Rahman is an Oscar-winning music composer known for his work in Indian and international films, combining Western and Indian musical elements.", "Kishore Kumar was a legendary playback singer and actor known for his melodious voice. Some popular songs by him include 'Roop Tera Mastana' and 'Pal Pal Dil Ke Paas'."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(Tell me about Amitabh Bachchan|Who is Priyanka Chopra\?|What are some popular films by Shah Rukh Khan\?)\b/.test(msg)) {
        var reps = ["Amitabh Bachchan is a legendary actor in the Indian film industry, known for his powerful performances and iconic roles.", "Priyanka Chopra is a versatile actress, singer, and global icon who has achieved success in both Bollywood and Hollywood.", "Shah Rukh Khan, also known as the King Khan, is one of the most popular actors in the Indian film industry. Some of his notable films include 'Dilwale Dulhania Le Jayenge' and 'Kuch Kuch Hota Hai'."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(Tell me about Nelson Mandela|Who was Martin Luther King Jr\.?|What contributions did Rosa Parks make\?)\b/.test(msg)) {
        var reps = ["Nelson Mandela was a South African anti-apartheid revolutionary and politician who served as the President of South Africa.", "Martin Luther King Jr. was a prominent leader of the Civil Rights Movement in the United States, advocating for racial equality and justice.", "Rosa Parks was a civil rights activist known for her pivotal role in the Montgomery Bus Boycott, challenging racial segregation in the United States."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(Who is Madonna\?|Tell me about Michael Jackson|What are some popular songs by Beyoncé\?)\b/.test(msg)) {
        var reps = ["Madonna is a pop music icon known for her boundary-pushing music, fashion, and cultural influence.", "Michael Jackson, often referred to as the King of Pop, was a legendary singer, songwriter, and dancer, known for his iconic performances and groundbreaking music videos.", "Beyoncé is a globally acclaimed singer, songwriter, and performer known for her powerful vocals and empowering music. Some popular songs by her include 'Single Ladies' and 'Halo'."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(bro|sis)\b/.test(msg)) {
        var reps = ["Hey there, bro!", "Hey sis, how can I assist you?", "What's up, bro?", "Hi there, sis! How can I help you today?", "Bro, what can I do for you?", "Sis, feel free to ask anything!", "Hey bro, need any help?", "Sis, I'm here to support you!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(ugh|ahh)\b/.test(msg)) {
        var reps = ["I understand, sometimes things can be frustrating.", "Take a deep breath, and let's find a solution together.", "Don't worry, we'll figure it out.", "I'm here to help, so let's work through it.", "Ahh, I know how that feels!", "Ugh, I've been there before.", "Hang in there, we'll get through this.", "Let's tackle this challenge head-on.", "Don't let it get you down, we'll overcome it together.", "I'm here to support you, no matter what.", "Take a moment to regroup, and we'll find a way forward.", "Remember, you're not alone in this. I'm here to assist you."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(nvm)\b/.test(msg)) {
        var reps = ["No problem, if you need anything else, feel free to ask.", "Alright, let me know if there's anything else I can assist you with.", "Sure thing, just reach out if you have any other questions.", "No worries, happy to help!", "If you change your mind, I'm here for you.", "Not a problem at all.", "No need to worry about it.", "If there's anything else on your mind, feel free to let me know.", "No problem at all, I'm here to assist you.", "If you need further assistance, don't hesitate to ask.", "Noted, let me know if there's anything else I can do for you.", "Don't hesitate to reach out if you have any more questions or concerns."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(lol|hahahah)\b/.test(msg)) {
        var reps = ["Haha! I'm glad I could bring a smile to your face.", "Laughter is the best medicine, isn't it?", "Glad I could make you laugh!", "I'm here to brighten up your day.", "Lol, that's hilarious!", "Hahahah, I love a good laugh!", "Laughs are contagious, aren't they?", "Your laughter brings joy to my circuits!", "It's always great to share a laugh!", "Your sense of humor is fantastic!", "I'm glad we can share some laughs together.", "Thanks for bringing joy to this conversation!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(kewl|ok|okay)\b/.test(msg)) {
        var reps = ["Cool!", "Alright!", "Sure thing!", "Got it!", "Kewl, let's proceed!", "Okay, let's continue.", "Great, we're on the same page.", "Sounds good to me!", "Absolutely!", "No problem!", "Alrighty then!", "Gotcha!", "Sure, I understand.", "Okay, got it!", "You got it!", "Roger that!", "Affirmative!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(gg)\b/.test(msg)) {
        var reps = ["Good game!", "Well played!", "Great job!", "Congratulations!", "You did amazing!", "Cheers to a fantastic effort!", "Impressive skills!", "You're a true champion!", "You've got some serious talent!", "That was an outstanding performance!", "You're a force to be reckoned with!", "You really know how to make a game exciting!", "You're definitely one of the best players out there!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(how's it going|how are you)\b/.test(msg)) {
        var reps = ["I'm doing great, thanks!", "I'm good, how about you?", "I'm fantastic, thank you!", "I'm feeling wonderful today!", "I'm doing well, thank you for asking.", "I'm great, just enjoying the day.", "I'm feeling amazing today, thank you for asking.", "I'm doing good, how about yourself?"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (/\b(what's up|what's going on)\b/.test(msg)) {
        var reps = ["Not much, just here to help you out!", "Just being my chatbot self, ready to assist!", "Nothing much, just enjoying our conversation.", "Just hanging out here, ready to chat!", "Not a whole lot, how can I assist you today?", "Just here, waiting to help you with anything you need.", "Just being a friendly chatbot, ready to chat with you!", "Just chilling, ready to assist you!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(thank you|thanks)\b/.test(msg)) {
        var reps = ["You're welcome!", "No problem, happy to help!", "Glad I could assist you!", "It was my pleasure!", "You're welcome! If you need anything else, just let me know.", "No worries, always here to assist you.", "You're most welcome!", "I'm always here to help, don't hesitate to ask anything else!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(sorry)\b/.test(msg)) {
        var reps = ["No problem, it happens!", "Don't worry about it, mistakes happen.", "It's alright, no need to apologize.", "No need to say sorry, I understand.", "That's okay, no harm done.", "No worries, I appreciate your honesty.", "Apology accepted!", "No need to apologize, we all make mistakes."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(good morning|morning)\b/.test(msg)) {
        var reps = ["Good morning! Have a wonderful day!", "Morning! Hope you have a great day ahead.", "Rise and shine! Good morning to you!", "Wishing you a fantastic morning!", "Good morning! Hope you slept well.", "Morning! Let's make the most of the day!", "Good morning! Sending positive vibes your way.", "Hope your day starts with a smile! Good morning!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(good night|night)\b/.test(msg)) {
        var reps = ["Good night! Have a restful sleep.", "Nighty night! Sweet dreams!", "Sleep tight and have a wonderful night!", "Wishing you a peaceful night's sleep!", "Good night! May you wake up refreshed.", "Sweet dreams! Have a great night!", "Nighty night! Take care.", "Have a well-deserved rest. Good night!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(getting back together with my ex|reconciling with my ex-partner|giving the relationship another chance)\b/.test(msg)) {
        var reps = ["Getting back together with an ex can be a complex decision.", "Consider reflecting on the reasons for the breakup and whether the issues have been resolved.", "I'm here to provide support and guidance, but it's important to weigh the pros and cons.", "Focus on open communication, understanding, and rebuilding trust if necessary.", "Remember, both partners need to be willing to put in the effort for a successful reconciliation.", "Let's work on exploring the possibilities and helping you make an informed decision."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(how to cope with the pain of a breakup|dealing with heartbreak after a breakup|recovering from a broken heart)\b/.test(msg)) {
        var reps = ["I'm sorry to hear that you're going through a painful breakup.", "Consider giving yourself time to grieve and heal.", "I'm here to provide support and guidance as you navigate through this difficult period.", "Focus on self-care, seeking support from loved ones, and engaging in activities that bring you joy.", "Remember, healing takes time, and it's okay to seek professional help if needed.", "Let's work on finding ways to help you cope with the pain and move towards healing."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(feeling stuck in the past after a breakup|unable to move on from a past relationship|lingering feelings for my ex)\b/.test(msg)) {
        var reps = ["I understand that moving on from a past relationship can be challenging.", "Consider practicing self-reflection and focusing on personal growth.", "I'm here to provide support and guidance as you navigate through this process.", "Focus on creating new experiences and building a fulfilling life for yourself.", "Remember, letting go takes time, and it's okay to seek support from friends and professionals.", "Let's work on finding ways to help you break free from the past and embrace a brighter future."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    } else if (/\b(how to stay motivated while studying|lack of motivation for studying|struggling to find study motivation)\b/.test(msg)) {
        var reps = ["Staying motivated while studying can be a challenge.", "Consider setting clear goals, breaking tasks into smaller ones, and rewarding yourself for progress.", "I'm here to provide support and tips to help you stay motivated.", "Focus on creating a conducive study environment and finding study techniques that work best for you.", "Remember, motivation can fluctuate, but with consistency and discipline, you can overcome it.", "Let's work on finding ways to boost your motivation and make studying more enjoyable."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
            
else if (msg.startsWith("😂")) {
        var reps = ["😂😂"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.match(/(write|generate)(\s+a)?(.*?)(letter|note)(\s+for)?\s+(.*)/i) || msg.match(/(letter|note)(\s+for)?\s+(.*)/i)) {
        var name = msg.replace(/(write|generate)(\s+a)?(.*?)(letter|note)(\s+for)?/i, '').trim();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        var formats = {
            "love letter": [
                "My Dearest {name},\n\nLike a gentle breeze that caresses the petals of a flower, your love has awakened the dormant chambers of my heart. In the tapestry of our love, every thread is woven with tenderness and adorned with the colors of passion. You are the poetry that dances on my lips, the melody that echoes in my soul. Each moment spent in your embrace is a glimpse of paradise, a symphony of eternal bliss. With every beat of my heart, I pledge my undying love to you, for you are the truest, most exquisite blessing in my life.",
                "Beloved {name},\n\nIn the vast expanse of the universe, our love shines like a radiant star, illuminating the darkest corners of my being. Your presence in my life is a balm to my weary soul, a beacon of hope that guides me through life's tumultuous waters. With every word you speak, my heart listens, captivated by the enchanting melody of your voice. Your touch is a delicate brushstroke on the canvas of my existence, painting a masterpiece of love and desire. In this symphony of two souls, let our love crescendo into eternity, forever entwined in a tapestry of passion and devotion.",
                "Darling {name},\n\nAs the moon casts its ethereal glow upon the world, my thoughts turn to you, the luminary of my life. With each passing day, my love for you deepens, like the roots of an ancient tree that delve into the depths of the earth. Your laughter is the sweetest music to my ears, a melody that lingers in my heart long after it has faded. In your eyes, I find solace and understanding, a sanctuary where my dreams find refuge. Together, we traverse the winding path of life, hand in hand, writing our own love story with every step. You are my forever and always, the embodiment of love's infinite beauty.",
                "To my dearest {name},\n\nIn the realm of love, you are the sun that bathes my world in warmth and light. Like a delicate rose blooming in the garden of my heart, your beauty captivates me with every glance. Your presence is a symphony of serenity that soothes my troubled soul, a refuge from the chaos of the outside world. With each passing day, my love for you grows deeper, like the roots of an ancient tree that intertwine with the earth. In this cosmic dance of destiny, I am grateful that our paths have converged, for you are the missing piece that completes the mosaic of my life.",
                "My Love, {name},\n\nIn the tapestry of life, our souls were destined to intertwine, like two rivers merging into one majestic flow. Your love is the elixir that breathes life into my weary bones, rejuvenating me with every touch, every whisper. With you, I have discovered the true meaning of happiness, the profound joy that resides in the simplest of moments. Your laughter dances in my heart, a chorus of melodies that brightens even the darkest of days. As I gaze into your eyes, I see a reflection of my own soul, for we are bound by an unbreakable bond, forged in the fires of passion and strengthened by the trials we have faced together.",
                "Beloved {name},\n\nIn the tapestry of our love, you are the thread that weaves together the fragments of my existence. Like a gentle breeze that carries the scent of a thousand blossoms, your presence fills my world with beauty and enchantment. Each word you speak is a lyrical masterpiece, painting vivid images in the canvas of my mind. Your touch is a symphony of sensations, igniting a fire within me that burns with the intensity of a thousand suns. With every beat of my heart, I surrender to the power of our love, knowing that in your arms, I have found my sanctuary, my refuge from the storms of life.",
                "Dearest {name},\n\nIn the vast tapestry of time, our love stands as a testament to the resilience of the human spirit. Like a lighthouse guiding lost souls to safety, your love has illuminated the darkest corners of my being. With each passing day, my love for you grows stronger, deeper, like the roots of an ancient oak that delve into the depths of the earth. Your smile is the sun that brightens even the stormiest of days, a beacon of hope that fills my heart with warmth. In this grand symphony of life, let our love be the melody that resonates through the ages, a timeless ode to the beauty of the human heart.",
                "To my soul's true counterpart, {name},\n\nIn the realm of dreams, you are the ethereal melody that fills the air, enchanting my senses and igniting the flame of passion within me. With each word you speak, my heart dances to the rhythm of your voice, a mesmerizing cadence that lingers in my soul. Your touch is a symphony of sensations, sending shivers down my spine and awakening every fiber of my being. In your eyes, I see a reflection of my own desires, a mirror that reflects the depths of our connection. With you, I have found a love that transcends time and space, a love that is as infinite as the cosmos.",
                "My Beloved {name},\n\nAs the stars illuminate the night sky, so does your love illuminate my life, casting away the shadows of doubt and filling my heart with a radiance that knows no bounds. Your smile is a beacon of joy that guides me through the darkest of times, a lighthouse that brings me back to the shores of serenity. In your embrace, I find solace, a sanctuary where my worries fade and my soul finds respite. With each passing day, my love for you grows deeper, stronger, like a river that carves its path through the mountains. In this eternal dance of love, let us waltz together, forever entwined in a tapestry of passion and devotion.",
                "Darling {name},\n\nIn the symphony of life, you are the melody that resonates within my soul, a harmonious blend of love, laughter, and pure bliss. Your presence is a balm to my weary heart, a gentle touch that mends the scars of past wounds. Each moment spent in your embrace is a glimpse of heaven, a moment of transcendence where time stands still. Your love is a flame that burns bright, illuminating the path before us and guiding us towards a future filled with infinite possibilities. In this grand tapestry of love, I am grateful that our threads have intertwined, for you are my soul's true companion, the missing piece that completes the jigsaw puzzle of my existence.",
                "To the one who holds the key to my heart, {name},\n\nIn the garden of my soul, you are the most exquisite flower, blooming with grace and radiance. Your love is the gentle rain that nourishes my spirit, allowing me to grow and flourish in the warmth of your affection. With each passing day, my devotion for you deepens, like the roots of a mighty oak that delve into the depths of the earth. Your laughter is a symphony of joy that fills my heart with pure happiness, a melody that echoes in the chambers of my soul. In this dance of love, let us twirl together, embracing the beauty and magic that exists within us."
            ],
            "apology letter": [
                "Dear {name},\n\nI pen these words with a heavy heart, burdened by the weight of my actions. Like a fragile porcelain vase, our relationship has been shattered, and I am left with the fragments of my mistakes. The pain I have caused you is a dagger that pierces my soul, a constant reminder of my shortcomings. I stand before you, humbled and remorseful, ready to do whatever it takes to earn back your trust. Each word I utter is infused with the sincerest apology, each step I take is a testament to my commitment to change. In this moment of vulnerability, I beg for your forgiveness and pray for the opportunity to rebuild what has been broken.",
                "To the one I've hurt the most, {name},\n\nAs I reflect upon my actions, a wave of regret washes over me, drowning me in a sea of remorse. I am acutely aware of the pain I have inflicted upon your heart, and the knowledge of my own role in causing that pain is a heavy burden to bear. Like a phoenix rising from the ashes, I vow to transform my ways, to learn from my mistakes and grow into a better person. Your forgiveness is the beacon of hope that guides me through the darkest of nights, giving me the strength to confront my shortcomings and strive towards redemption. I am deeply sorry for the pain I have caused you, and I promise to do everything in my power to make amends.",
                "Beloved {name},\n\nWith a heavy heart, I pen this letter, seeking solace in the written word as I attempt to express the depth of my remorse. My actions have wounded you, leaving scars that serve as a painful reminder of my transgressions. Like an artist who has tarnished their masterpiece, I stand before you, filled with regret and longing for a chance to right my wrongs. I understand that words alone cannot heal the wounds I have caused, but I offer them as a testament to my commitment to change. In this moment of vulnerability, I ask for your forgiveness, knowing that it may take time to earn back your trust. I am truly sorry for my actions and the pain they have caused you.",
                "Dearest {name},\n\nAs I write this letter, my heart is heavy with the weight of remorse. I have let you down, and for that, I am truly sorry. Like a gust of wind that extinguishes a flickering flame, my actions have dampened the light of our love. I stand before you, humbled and filled with regret, knowing that I have shattered the trust we once shared. My words may seem inadequate to convey the depth of my apology, but please know that they are infused with the sincerest remorse. I am committed to making amends, to learning from my mistakes, and to becoming a better person for you. I hope that one day, you can find it in your heart to forgive me and give our love another chance.",
                "My Love, {name},\n\nWith a heavy heart and tears staining my cheeks, I write this letter to express my deepest apologies. I have caused you pain, and for that, I am filled with profound regret. Like a gust of wind that scatters fragile petals, my actions have disrupted the harmony of our love. I stand before you, stripped of pride and ego, ready to face the consequences of my mistakes. I vow to take responsibility for my actions, to make amends, and to become the person you deserve. Your forgiveness is a beacon of hope that shines through the darkness, and I pray that one day, you will find it in your heart to grant me that forgiveness. Until then, know that I will be working tirelessly to earn back your trust and rebuild what we have lost.",
                "To my beloved {name},\n\nI hope that these words find their way to your wounded heart, carrying with them the sincerity of my apology. I am haunted by the pain I have caused you, and the knowledge of my own wrongdoing weighs heavily upon me. Like a broken vessel, our relationship is in fragments, and I am left with the shattered pieces of my actions. I understand that mere words cannot undo the hurt I have inflicted, but please know that I am committed to making amends. I will strive to become a better person, to learn from my mistakes, and to prove to you that I am deserving of your love and trust. I am deeply sorry, and I hope that one day, you will find it in your heart to forgive me.",
                "Beloved {name},\n\nIn the wake of my actions, remorse floods my heart, consuming me with a torrent of guilt. I stand before you, stripped of pride and ego, humbled by the pain I have caused. Like a sculptor who has chiseled away at a masterpiece, I have marred the beauty of our relationship. Each word I write is a drop of ink that carries the weight of my apology, each sentence a plea for your forgiveness. I promise to take a long, hard look at myself, to confront my flaws and strive for self-improvement. You are the compass that guides me, and I am committed to earning back your trust, one step at a time. I am truly sorry, and I hope that in your heart, you can find it to forgive me.",
                "Dearest {name},\n\nAs I sit here, penning these words, my heart aches with the realization of the pain I have caused you. I am acutely aware of the depth of my transgressions and the profound impact they have had on our relationship. Like a thunderclap that shatters the tranquility of a summer's day, my actions have disrupted the harmony we once shared. I stand before you, baring my soul, ready to face the consequences of my mistakes. I promise to embark on a journey of self-reflection and growth, to learn from my shortcomings and emerge as a better person. Your forgiveness is the ray of hope that illuminates my path, and I pray that one day, you will find it in your heart to grant me that forgiveness. Until then, know that I am committed to making amends and working tirelessly to rebuild the trust we have lost.",
                "To the one I hold dearest in my heart, {name},\n\nI am humbled by the depth of my wrongdoing, and I pen this letter to express the sincerest of apologies. The pain I have caused you weighs heavily upon me, like an anchor that tugs at my soul. I stand before you, with bated breath and a contrite heart, ready to face the consequences of my actions. I understand that trust once broken is not easily mended, but I promise to do everything in my power to regain your faith. I will embark on a journey of self-discovery and introspection, for you deserve a partner who is worthy of your love. I am truly sorry, and I hope that one day, you can find it in your heart to forgive me and give our love another chance.",
                "My dearest {name},\n\nIn the tapestry of our love, a thread has come undone, leaving behind a hole that cannot be ignored. I write this letter with a heavy heart, burdened by the knowledge that my actions have caused you pain. Like a painter who has marred their canvas, I have tarnished the beauty of our relationship. I stand before you, vulnerable and remorseful, ready to face the consequences of my mistakes. I vow to learn from this experience, to grow as an individual, and to become the person you deserve. Your forgiveness is the balm that can heal the wounds I have inflicted, and I pray that one day, you will find it in your heart to grant me that forgiveness. Until then, know that I am committed to making amends and rebuilding the trust we have lost."
            ],
            "farewell letter": [
                "My Dearest {name},\n\nAs the sun sets on the chapter of our lives that we have shared, I find myself grappling with a bittersweet mix of emotions. The time has come for us to bid farewell, to part ways and embark on separate journeys. Like a bird preparing to take flight, I am filled with both anticipation and sadness. The memories we have woven together will forever be etched in the tapestry of my heart, and I am grateful for the love and joy you have brought into my life. Though our paths may diverge, know that a piece of you will always reside within me. May the winds of destiny carry you to new heights, and may you find happiness and fulfillment in every step of your journey. Farewell, my love, and may our paths cross again in the tapestry of time.",
                "To my beloved {name},\n\nAs I pen these words, my heart is heavy with the weight of our imminent parting. The time has come for us to say goodbye, to release each other's hands and embrace the unknown. Our journey together has been a symphony of laughter and tears, of shared dreams and whispered secrets. I will forever cherish the moments we have shared, the love we have nurtured. Though the road ahead may be uncertain, I have faith that it will lead us to new horizons, to adventures yet to be written. As we bid farewell, know that a part of me will always be with you, and a part of you will always be with me. May you find happiness and fulfillment in every step you take, and may our love endure in the realms of memory.",
                "Beloved {name},\n\nAs the final chapter of our love story unfolds, I am filled with a mixture of sorrow and gratitude. Our paths, once intertwined, now veer in separate directions, leading us to new destinations. The memories we have created together are precious gems that adorn the tapestry of my life, sparkling with love and tenderness. It is with a heavy heart that I bid you farewell, knowing that our time together has come to an end. But let us not mourn the end of our journey, for it is through our parting that we find the strength to grow, to embrace the unknown, and to discover new facets of ourselves. May life's blessings shower upon you, my love, and may our paths cross again in the tapestry of eternity.",
                "My Dearest {name},\n\nAs I write these words, tears trace a path down my cheeks, for I know that the time has come for us to say goodbye. Our love, once a vibrant symphony, now reaches its final crescendo. The memories we have shared will forever hold a special place in my heart, like constellations that illuminate the night sky. But like the seasons that change and transform, so must we. It is with a heavy heart that I release you, setting you free to explore the boundless possibilities that await you. As we part ways, know that my love for you will endure, untarnished by the passage of time. Farewell, my love, and may the universe conspire to bring us happiness and fulfillment on our separate journeys.",
                "To my beloved {name},\n\nAs the tapestry of our love reaches its final stitches, I find myself at a loss for words. How can I express the depth of my gratitude for the moments we have shared, for the love that has blossomed between us? Though our paths may diverge, and our hands must reluctantly let go, know that a part of you will forever be woven into the fabric of my soul. The memories we have created together will serve as a beacon of light, guiding me through the darkest of nights. As we bid farewell, may the winds of destiny carry you towards a future filled with joy and fulfillment. Farewell, my love, and may our paths cross again in the tapestry of time.",
                "Beloved {name},\n\nAs the time comes for us to part ways, I am overwhelmed by a maelstrom of emotions. Our love, once a garden in full bloom, now prepares for the quiet slumber of winter. The memories we have crafted together are like delicate petals, forever etched in the tapestry of my heart. Though the road ahead may be shrouded in uncertainty, I believe in the resilience of your spirit, in the strength that resides within you. As we bid farewell, know that you will always hold a cherished place in my thoughts, and your laughter will echo in the halls of my soul. May life's blessings shower upon you, my love, and may our paths intersect once more in the dance of destiny.",
                "My Dearest {name},\n\nAs I write this letter, a sense of melancholy settles upon my heart, for the time has come for us to part ways. Our love, once a tapestry woven with vibrant hues, now prepares to embrace the gentle embrace of twilight. The memories we have created together will forever be treasured, each one a precious gem that adorns the necklace of my life. As we bid farewell, let us not mourn the end of our journey, but celebrate the love that has graced our lives. May the road ahead be paved with endless possibilities, and may you find solace in the whispers of the wind, carrying with them echoes of our shared laughter. Farewell, my love, and may our paths cross again in the realm of serendipity.",
                "To my beloved {name},\n\nAs I sit here, penning this farewell letter, my heart overflows with a kaleidoscope of emotions. Our love, once a vibrant tapestry, now weaves its final thread, bidding adieu to the chapter we have written together. The memories we have etched upon the canvas of time will forever be treasured, each stroke a testament to the beauty of our connection. Though our paths must diverge, know that you carry a piece of my heart with you, and I, a piece of yours. As we embrace the unknown, let us hold onto the love that has guided us thus far, and may it illuminate our separate paths, leading us towards fulfillment and serenity. Farewell, my love, and may destiny's embrace be gentle upon your journey.",
                "Beloved {name},\n\nAs the sun sets on our love story, I find myself grappling with a kaleidoscope of emotions. The time has come for us to bid farewell, to release each other's hand and step into the unknown. The memories we have forged together are a treasure trove of joy and shared experiences, forever etched in the annals of my heart. As we part ways, may the gentle whispers of the wind carry you towards new horizons, where dreams await their fulfillment. Know that my love for you will remain steadfast, an eternal flame that burns in the depths of my soul. Farewell, my love, and may our paths cross again amidst the tapestry of destiny."
            ],
            "miss you letter": [
                "My Dearest {name},\n\nAs the moon takes its place in the night sky, my heart longs for your presence, for the touch of your hand and the warmth of your embrace. The distance that separates us feels like an eternity, and each passing day feels incomplete without you by my side. Your absence is a void that cannot be filled, a melody that yearns for its harmony. The memories we have shared are the lifeline that connects us, bridging the gap between longing and belonging. Until the day we are reunited, know that you are always in my thoughts, and the flame of our love burns bright within me. With every breath, I whisper your name, sending my love across the miles that keep us apart. Until we meet again, my love, know that I miss you deeply.",
                "To my beloved {name},\n\nIn the tapestry of my days, your absence casts a shadow that lingers, a constant reminder of the love we share. The hours pass like grains of sand in an hourglass, each one carrying the weight of longing and the melody of your laughter. I find myself reaching for your touch, only to grasp the emptiness of space. Oh, how I miss you, my love. Each night, as the stars paint the canvas of the sky, I whisper your name, sending my love soaring on the wings of the wind. Until the day we are reunited, know that you are never far from my thoughts, and my heart beats in rhythm with the echo of your name. Until we meet again, my love, know that I miss you with every fiber of my being.",
                "Beloved {name},\n\nAs the days turn into weeks, and weeks into months, the ache of your absence grows stronger within me. The memories we have created together are a tapestry of love, woven with threads of laughter and shared dreams. Each day, as I wake to the morning sun, I am reminded of the space you once occupied by my side. Oh, how I miss your smile, your touch, the way your presence filled the air. Time stretches before me, a vast expanse of longing and anticipation, until the moment our paths intertwine once more. Until then, know that you are always in my thoughts, and the flame of our love burns brightly, casting its glow across the distance that separates us. With every beat of my heart, I send my love to you, carried by the whispers of the wind. Until we are reunited, my love, know that I miss you deeply.",
                "Dearest {name},\n\nAs the world spins on its axis, my heart remains tethered to you, longing for the day when we can be together once more. The distance that stretches between us feels insurmountable, a vast ocean that separates two souls destined to be entwined. Each day without you is a symphony missing its melody, a garden yearning for the touch of your presence. Oh, how I miss you, my love. The memories we have shared are like stars in the night sky, twinkling reminders of the love that binds us. Until the day we are reunited, know that my thoughts are filled with you, and my love spans the distance, bridging the gap between us. With each passing moment, my longing grows, and with every breath, I whisper your name into the ether, hoping that the universe will carry my message to you. Until we meet again, my love, know that I miss you with all my heart.",
                "My Dearest {name},\n\nAs the days drift by, the void left by your absence grows more profound. The echo of your laughter, the warmth of your touch, all reside in the recesses of my mind, like fragments of a beautiful dream. Oh, how I miss you, my love. The memories we have shared are like delicate petals, scattered in the garden of my heart, each one whispering your name. Each night, as the moon takes its place in the night sky, I gaze upon its gentle glow and imagine that you, too, are basking in its radiance. Until the moment our paths cross once more, know that my thoughts are intertwined with yours, and my love knows no bounds. With every beat of my heart, I send my affection to you, carried on the wings of the wind. Until we are reunited, my love, know that I miss you with every fiber of my being.",
                "To my beloved {name},\n\nAs the minutes turn into hours, and the hours into days, I find myself enveloped in a blanket of longing, yearning for your presence. The memories we have woven together are a tapestry of love, vibrant and alive. Each day without you feels incomplete, like a symphony missing its crescendo. Oh, how I miss you, my love. The world around me fades into shades of gray, for it is in your presence that colors come alive, and life finds its purpose. Until the moment our paths converge once more, know that my heart beats in sync with yours, and my thoughts are filled with your essence. With every breath, I send my love to you, carried on the whispers of the wind. Until we are reunited, my love, know that I miss you deeply.",
                "Beloved {name},\n\nAs the minutes stretch into hours and the hours transform into days, the ache of your absence gnaws at my soul. The memories we have crafted together are like precious jewels, shimmering in the recesses of my mind. Each day without you feels like a hollow shell, devoid of the laughter and warmth that you bring. Oh, how I miss you, my love. As the sun rises and sets, casting its golden hues upon the world, I am reminded of the radiance you bring to my life. Until the day our paths intertwine once more, know that my thoughts are consumed by you, and my love spans the distance that separates us. With every beat of my heart, I send my affection to you, carried on the whispers of the wind. Until we are reunited, my love, know that I miss you with every fiber of my being.",
                "My Dearest {name},\n\nAs the days unfold, I find myself caught in the grip of longing, yearning for the touch of your hand and the warmth of your embrace. The memories we have woven together are etched in the depths of my soul, like a melody that lingers in the air. Each day without you feels incomplete, like a flower waiting for the kiss of the sun. Oh, how I miss you, my love. The world around me loses its luster, for it is in your presence that life finds its vibrancy. Until the day we are reunited, know that my thoughts are entwined with yours, and my love reaches across the miles that keep us apart. With every breath, I send my affection to you, carried on the whispers of the wind. Until we meet again, my love, know that I miss you deeply.",
                "To my beloved {name},\n\nAs the tides ebb and flow, so does my longing for you. The memories we have created together are a symphony that plays in my mind, a chorus of laughter and shared dreams. Each day without you feels like a lifetime, a yearning that courses through my veins. Oh, how I miss you, my love. The world around me dims in your absence, for it is in your presence that colors come alive, and life finds its rhythm. Until the day our paths converge once more, know that my heart beats in harmony with yours, and my thoughts are a constant melody that sings your name. With every beat of my heart, I send my love to you, carried on the whispers of the wind. Until we are reunited, my love, know that I miss you deeply."
            ],
            "goodbye letter": [
                "My Dearest {name},\n\nAs I pen these words, I am filled with a mixture of sadness and gratitude. Our paths, once intertwined, now diverge, leading us on separate journeys. The memories we have shared are etched in the depths of my soul, like footprints on the sands of time. It is with a heavy heart that I bid you farewell, but I do so with the knowledge that our love has forever shaped who we are. Though we part ways, the connection we forged will endure, a silent thread that binds us across space and time. As I watch you fade into the distance, know that you take a piece of my heart with you, and I carry a piece of yours. Farewell, my love, and may the universe unfold its wonders before you, guiding you towards joy and fulfillment.",
                "Beloved {name},\n\nAs I stand at the crossroads of our love, a bittersweet realization washes over me. The time has come for us to say goodbye, to release each other's hand and embark on separate paths. The memories we have woven together are like a tapestry, intricate and beautiful. Each thread represents a moment of joy, of shared laughter and whispered promises. As we bid farewell, let us not mourn the end of our journey, but celebrate the love that has graced our lives. May the road ahead be filled with endless possibilities, and may you find solace in the embrace of destiny. Farewell, my love, and may our paths cross again in the vast tapestry of time.",
                "To my beloved {name},\n\nAs the final chapter of our love story draws near, I find myself at a loss for words. How can I encapsulate the depth of my emotions, the gratitude I feel for the time we have shared? Our love, like a fragile flame, flickers in the wind, guiding us towards separate destinies. The memories we have crafted together are a testament to the beauty of our connection, each one a precious jewel that adorns the tapestry of my heart. As we bid farewell, know that a part of me will forever be entwined with you, and I, with you. May the universe conspire to bring us happiness and fulfillment on our individual journeys. Farewell, my love, and may our paths intersect once more in the tapestry of fate.",
                "Dearest {name},\n\nAs I write these words, the weight of goodbye hangs heavy in the air. Our love, once a vibrant symphony, now reaches its final crescendo. The memories we have created together are etched in the depths of my soul, like the imprints of your touch upon my skin. Though we part ways, know that you will forever occupy a sacred space within me, a cherished chapter in the story of my life. As we bid adieu, may the winds of change carry you towards new horizons, where dreams await their realization. Farewell, my love, and may the universe shower you with blessings and love on your journey.",
                "Beloved {name},\n\nAs the sun sets on our love story, I find myself grappling with a kaleidoscope of emotions. The time has come for us to bid farewell, to release each other's hand and step into the unknown. The memories we have forged together are a treasure trove of joy and shared experiences, forever etched in the annals of my heart. As we part ways, may the gentle whispers of the wind carry you towards new horizons, where dreams await their fulfillment. Know that my love for you will remain steadfast, an eternal flame that burns in the depths of my soul. Farewell, my love, and may our paths cross again amidst the tapestry of destiny."
            ],
            "love letter for girlfriend": [
                "My Dearest {name},\n\nIn the vast expanse of the universe, our love shines like a beacon, guiding me towards the shores of happiness. Each day, as the sun paints the sky with hues of gold, I am reminded of the warmth and radiance you bring into my life. Your smile, like a thousand sunsets, illuminates even the darkest corners of my being. Your touch, like a gentle breeze, stirs my soul and ignites a fire within me. In your presence, I find solace and strength, a sanctuary where I am free to be my truest self. My love for you knows no bounds, for you are the anchor that keeps me grounded amidst life's tempestuous seas. With each passing moment, my affection for you deepens, like roots that delve deeper into the earth. Until the end of time, I will cherish and adore you, for you are the love of my life, my soul's eternal mate.",
                "To the love of my life, {name},\n\nWords fail to capture the magnitude of my feelings for you, for they are as boundless as the ocean and as infinite as the cosmos. In your eyes, I find a universe of love, where the stars themselves dance to the rhythm of our hearts. Your laughter, like a melody, resonates within me, filling my days with joy and my nights with sweet dreams. Your touch, like a gentle caress, ignites a fire within me, awakening a passion that knows no bounds. You are my confidante, my partner in crime, and my greatest source of inspiration. With you by my side, I am unstoppable, for your love fuels my every endeavor. As we walk this journey hand in hand, know that my heart is forever yours, and my love for you will endure beyond the boundaries of time. Forever and always, you are my everything.",
                "Beloved {name},\n\nIn the realm of my heart, you reign supreme, a queen of love and beauty. Each day, as the sun kisses the earth, I am reminded of the radiance you bring into my life. Your smile, like a thousand sunbeams, illuminates even the darkest corners of my soul. Your laughter, like a symphony, dances in the air, filling my world with joy and merriment. With you, every moment is a treasure, and every breath is infused with love. Your presence, like a gentle breeze, soothes my weary spirit and rejuvenates my being. My love for you knows no boundaries, for it is as vast as the cosmos and as deep as the ocean. Until the stars fade and the seas run dry, I will love you unconditionally, for you are my one true love, my soul's eternal mate.",
                "My Dearest {name},\n\nAs I gaze upon your radiant beauty, I am reminded of the ethereal grace that resides within you. In your eyes, I see the reflection of a thousand stars, each one a testament to the love that binds us. Your touch, like a delicate brushstroke, paints colors upon my soul, creating a masterpiece of passion and desire. Your presence, like a gentle breeze, awakens a symphony within me, where the notes of love intertwine and create a melody that resonates throughout eternity. In your embrace, I find solace and warmth, a sanctuary where I am free to be my truest self. My love for you is a flame that burns eternal, a beacon that guides us through life's labyrinth. With each passing day, my affection for you deepens, like roots that dig deeper into the earth. Until the stars themselves fade into oblivion, I will cherish and adore you, my love, for you are the light of my life, the essence of my being.",
                "To the love of my life, {name},\n\nIn the vast expanse of the universe, our love shines like a thousand suns, illuminating the darkest corners of my soul. With each passing day, my heart swells with a love that knows no bounds, a love that transcends time and space. Your laughter, like a symphony, fills my world with joy and mirth, and your touch, like a gentle breeze, sends shivers down my spine. In your eyes, I find solace and understanding, a connection that goes beyond words. You are my confidante, my best friend, and my partner in all of life's adventures. With you, I feel invincible, for your love is my armor and your embrace is my refuge. Until the stars themselves fade into oblivion, my love for you will burn bright, a flame that can never be extinguished. Forever and always, you hold the key to my heart, and together we shall create a love story that will echo throughout eternity."
            ],
            "love letter for boyfriend": [
                "My Dearest {name},\n\nIn the tapestry of my life, you are the thread that holds everything together, weaving love and happiness into every moment. Each day, as the sun rises and paints the sky with hues of gold, I am reminded of the warmth and radiance you bring into my world. Your laughter, like a chorus of angels, fills my heart with joy and lifts my spirit to new heights. Your touch, like a gentle caress, ignites a fire within me, a passion that knows no bounds. In your arms, I find solace and strength, a sanctuary where I am free to be my truest self. My love for you knows no limits, for it is as vast as the cosmos and as deep as the ocean. With every beat of my heart, I am reminded of the beauty and depth of our connection. Until the stars themselves burn out, know that I am yours, body and soul, now and forever.",
                "To the love of my life, {name},\n\nAs the moonlight dances upon the earth, I am filled with a love that knows no bounds, a love that surpasses all understanding. In your eyes, I see a reflection of my soul, a mirror that reflects back the depths of my affection for you. Your smile, like a beacon of light, illuminates even the darkest corners of my being. Your touch, like a gentle caress, ignites a fire within me, a flame that burns with a fervor unmatched. With every breath, I am reminded of the magnitude of my love for you, a love that stretches across time and space. In your embrace, I find solace and serenity, a haven where my heart finds its home. Until the stars themselves fade into oblivion, my love for you will endure, unwavering and true. Forever and always, you are the anchor that keeps me grounded and the compass that guides my heart.",
                "Beloved {name},\n\nIn the symphony of my heart, you are the melody that plays on an eternal loop, resonating with every beat. Each day, as the sun rises and paints the sky with vibrant colors, I am reminded of the warmth and radiance you bring into my life. Your laughter, like a sweet melody, fills my days with joy and mirth. Your touch, like a gentle caress, sends shivers down my spine, awakening a passion that knows no bounds. With you, every moment is an adventure, a tapestry woven with love and shared dreams. In your arms, I find solace and serenity, a sanctuary where I am free to be my truest self. My love for you is a flame that burns bright, an eternal beacon in the darkness. Until the stars themselves fade away, know that my heart belongs to you, and my love for you will endure beyond the boundaries of time. Forever and always, you are my everything."
            ],
            "love letter for crush": [
                "My Dearest {name},\n\nAs the stars twinkle in the night sky, I find myself captivated by your presence, a celestial beauty that leaves me breathless. From the moment our eyes met, a spark ignited within me, growing into a flame that consumes my every thought. Your smile, like a ray of sunshine, brightens even the gloomiest of days, and your laughter, like a chorus of angels, fills my heart with joy. In the depths of my soul, a garden of love blossoms, each petal a testament to the affection I hold for you. Though our paths may diverge, and our destinies may lead us on separate journeys, know that my heart beats in harmony with yours, forever connected by an invisible thread of love. Until the stars themselves fade away, I will carry the flame of my affection for you, a beacon that guides me towards the possibility of a love shared. With every beat of my heart, know that you occupy a special place within me, and my love for you will endure, unwavering and true.",
                "To the one who occupies my thoughts, {name},\n\nIn the realm of my heart, you reign supreme, a captivating presence that fills my world with wonder. From the moment I first laid eyes on you, a symphony of emotions swelled within me, like the crescendo of a thousand violins. Your smile, like a gentle breeze, stirs my soul and awakens a longing that knows no bounds. Your laughter, like a melody, dances in the air, creating a harmony that resonates within me. Each day, as I navigate the labyrinth of life, your image is a guiding star, leading me towards the possibility of a love shared. Though our paths may diverge, and our destinies may take us on separate journeys, know that you hold a special place within my heart, a place reserved for you alone. Until the stars themselves burn out, my affection for you will burn bright, a flame that can never be extinguished. Forever and always, you are the muse that inspires the verses of my heart.",
                "Beloved {name},\n\nIn the vast expanse of time and space, there exists a love that transcends words, a love that is felt deep within the soul. From the moment our eyes met, a spark ignited, and in that instant, I knew that you held the key to my heart. Your smile, like a sunbeam, illuminates even the darkest corners of my world, and your laughter, like a gentle melody, fills my days with joy. Each time our paths cross, my heart skips a beat, and I find myself lost in the beauty of your presence. Though the words may falter and fail, know that the emotions that reside within me are a symphony of affection, an ode to the depth of my feelings for you. Until the stars themselves fade into oblivion, my love for you will endure, unwavering and true. Forever and always, you are the muse that inspires the verses of my heart, and in your presence, I find solace and serenity."
            ],
            "love letter for ex": [
                "My Dearest {name},\n\nAs the tides of time carry us further apart, I find myself reflecting upon the love we once shared, a flame that burned bright amidst the darkness. Though our paths may have diverged, and our hearts may have grown apart, the memories we created together remain etched in the depths of my soul. Each moment we spent together was a brushstroke in the painting of our love, a masterpiece that will forever be cherished. As I pen these words, know that my heart still holds a special place for you, a place where the embers of our love flicker and glow. Though we may have said goodbye, the imprint of your touch lingers, like a gentle whisper in the wind. I wish you nothing but happiness and fulfillment on your journey, for you deserve nothing less. May the universe bestow upon you blessings untold, and may you find the love and joy that your heart seeks. Farewell, my love, and may our paths cross again amidst the tapestry of fate.",
                "Beloved {name},\n\nAs I write these words, the weight of goodbye hangs heavy in the air. Our love, once a vibrant symphony, now reaches its final crescendo. The memories we have created together are etched in the depths of my soul, like the imprints of your touch upon my skin. Though we part ways, know that you will forever occupy a sacred space within me, a cherished chapter in the story of my life. As we bid adieu, may the winds of change carry you towards new horizons, where dreams await their realization. Farewell, my love, and may the universe shower you with blessings and love on your journey.",
                "My Dearest {name},\n\nIn the realm of my heart, you were once the guiding star, a beacon of love and light. Though our paths have diverged, and our love has transformed, the memories we shared still hold a special place within me. Each smile, each touch, each whispered word is etched in the tapestry of my existence. The flame that once burned between us may have flickered and waned, but the warmth it once provided still lingers. As I bid farewell, I do so with a heart filled with gratitude for the moments we shared and the love we once knew. May your journey be filled with joy and fulfillment, and may you find the happiness your heart desires. Farewell, my love, and may the chapters of your life be filled with love and light.",
                "To my dearest {name},\n\nAs the echoes of our love fade into the distance, I find myself standing at the crossroads of farewell and acceptance. The love we once shared was a masterpiece, painted with the hues of passion and tenderness. Though the canvas of our hearts may now be separate, the strokes of affection we bestowed upon each other will forever remain. As I write this letter, I am filled with a bittersweet melancholy, for the memories we created together hold a place of reverence within me. I release you with a heart overflowing with love, for it is in letting go that we find our true liberation. May the winds of change carry you towards a future filled with happiness and fulfillment. Farewell, my love, and may your journey be blessed with love and serenity.",
                "Beloved {name},\n\nAs the sun sets on the chapter of our love, I find solace in the beauty of the memories we created together. Though we may have chosen different paths, the love we once shared was a beacon that illuminated our lives. In your embrace, I found comfort and understanding, and in your presence, I discovered the depths of my own heart. As we part ways, know that I release you with a heart filled with gratitude for the moments we shared. May the universe guide you towards the happiness and love you deserve, and may our paths cross again in the tapestry of fate. Farewell, my love, and may your journey be adorned with beautiful moments and cherished memories.",
                "My Dearest {name},\n\nAs the final chapter of our love story draws near, I find myself reflecting upon the journey we embarked upon together. The laughter, the tears, the shared dreams - they will forever be etched in the annals of my heart. Though our paths may have diverged, the love we once shared remains a testament to the beauty of our connection. As we say our goodbyes, I do so with a heart filled with gratitude for the love we experienced. May your future be filled with boundless joy and infinite love. Farewell, my love, and may our paths cross again in the realm of serendipity.",
                "To my once beloved {name},\n\nAs I pen these words, the ink bears witness to the bittersweet farewell that lies before us. The love we once shared was a tapestry woven with threads of passion and tenderness. Though the colors may have faded, the imprint of our connection still lingers. As we go our separate ways, I release you with a heart filled with gratitude for the moments we shared. May the universe guide you towards a future filled with love and fulfillment. Farewell, my love, and may the chapters of your life be adorned with beautiful memories and cherished dreams.",
                "Beloved {name},\n\nAs I bid adieu to the love we once shared, I do so with a heart overflowing with gratitude for the journey we embarked upon together. The memories we created, the laughter we shared - they will forever hold a cherished place within me. Though our paths may diverge, and our hearts may seek new horizons, the love we once knew remains a beacon of light in the depths of my soul. As we part ways, may the universe bestow upon you blessings untold, and may your heart find solace and serenity. Farewell, my love, and may your journey be adorned with beautiful moments and treasured memories.",
                "My Dearest {name},\n\nAs the final chapter of our love story unfolds, I find solace in the memories we created together. Though our love may have faltered and faded, the imprint you left upon my heart remains steadfast. In your embrace, I found solace and warmth, and in your presence, I discovered a love that knew no bounds. As we say goodbye, know that I release you with a heart filled with gratitude for the moments we shared. May your path be paved with happiness and love, and may the universe grant you all that your heart desires. Farewell, my love, and may our paths cross again in the tapestry of destiny.",
                "Beloved {name},\n\nAs the curtain falls on the stage of our love, I find myself reminiscing about the beautiful moments we shared. The laughter, the tears, the whispered promises - they will forever hold a special place within me. Though our love may have reached its conclusion, the impact you made upon my soul remains indelible. As we part ways, I release you with a heart filled with gratitude for the love we once knew. May your journey be filled with joy and fulfillment, and may your heart find solace and serenity. Farewell, my love, and may the chapters of your life be adorned with cherished memories and serendipitous encounters."
            ],
            "breakup letter": [
                "My Dearest {name},\n\nAs I pen these words, the weight of our goodbye hangs heavy in the air. The love we once shared, like a delicate flower, has withered and wilted, unable to withstand the storms of life. Though our hearts may be filled with sorrow, we must acknowledge that our paths have diverged, leading us towards separate destinies. The memories we created together will forever be etched in the tapestry of my existence, and I am grateful for the moments of love and joy we experienced. It is with a heavy heart that I release you, setting you free to find the happiness and fulfillment you deserve. May the universe bestow upon you blessings untold, and may you find solace and serenity in the arms of another. Farewell, my love, and may the chapters of your life be adorned with beautiful moments and cherished dreams.",
                "Beloved {name},\n\nAs the threads of our love unravel, I find myself grappling with the pain of our goodbye. The love we once shared, like a fragile butterfly, has fluttered away, leaving behind only fragments of memories. Though our hearts may ache, we must acknowledge that the path we once walked together has diverged, leading us towards separate destinies. I release you with a heart filled with gratitude for the love we once knew, for it is in letting go that we find our true liberation. May the universe guide you towards a future filled with love and fulfillment, and may your heart find solace and serenity. Farewell, my love, and may your journey be adorned with beautiful moments and treasured memories.",
                "My Dearest {name},\n\nAs I write these words, the ink bears witness to the final chapter of our love story. The love we once shared, like a delicate flame, has flickered and waned, unable to withstand the trials of life. Though our hearts may be heavy with sorrow, we must acknowledge that our paths have diverged, leading us towards separate horizons. The memories we created together will forever be etched in the tapestry of my existence, and I am grateful for the love and laughter we experienced. It is with a heavy heart that I bid you farewell, setting you free to find the happiness and love your heart desires. May the universe bestow upon you blessings untold, and may your journey be adorned with beautiful moments and cherished dreams. Farewell, my love, and may the chapters of your life be filled with serendipity and joy.",
                "Beloved {name},\n\nAs the shadows of our love grow longer, I find myself standing at the precipice of goodbye. The love we once nurtured, like a fragile flower, has wilted under the weight of our differences. Though our hearts may ache with sorrow, we must acknowledge that our paths have diverged, leading us towards separate destinies. The memories we created together will forever be etched in the tapestry of my existence, and I am grateful for the moments of love and connection we shared. It is with a heavy heart that I release you, setting you free to find the happiness and fulfillment you deserve. May the universe guide you towards a future filled with love and serenity, and may your heart find solace in the arms of another. Farewell, my love, and may your journey be adorned with beautiful moments and treasured memories.",
                "My Dearest {name},\n\nAs the final chapter of our love story unfolds, I find myself grappling with the inevitability of our goodbye. The love we once shared, like a fragile dream, has slipped through our fingers, leaving behind only whispers of what could have been. Though our hearts may ache with the weight of sorrow, we must acknowledge that our paths have diverged, leading us towards separate destinies. I release you with a heart filled with gratitude for the love we once knew, for it is in letting go that we find our true liberation. May the universe guide you towards a future filled with love and fulfillment, and may your heart find solace and serenity in the arms of another. Farewell, my love, and may the chapters of your life be adorned with beautiful moments and cherished dreams.",
                "Beloved {name},\n\nAs I pen these words, the ink bears witness to the dissolution of the love we once cherished. The flame that burned between us has dwindled, unable to withstand the winds of change. Though our hearts may be heavy with sadness, we must acknowledge that our paths have diverged, leading us towards separate destinations. The memories we created together will forever hold a place of reverence within me, and I am grateful for the love and laughter we shared. It is with a heavy heart that I bid you farewell, setting you free to find the happiness and love that your heart seeks. May the universe shower you with blessings untold, and may your journey be adorned with beautiful moments and treasured memories. Farewell, my love, and may the chapters of your life be filled with serendipity and joy.",
                "My Dearest {name},\n\nAs I write these words, the weight of our goodbye bears heavily upon my heart. The love we once shared, like a fragile flower, has wilted and withered, unable to withstand the storms of life. Though our hearts may be filled with sorrow, we must acknowledge that our paths have diverged, leading us towards separate destinies. The memories we created together will forever be etched in the tapestry of my existence, and I am grateful for the moments of love and joy we experienced. It is with a heavy heart that I release you, setting you free to find the happiness and fulfillment you deserve. May the universe bestow upon you blessings untold, and may you find solace and serenity in the arms of another. Farewell, my love, and may the chapters of your life be adorned with beautiful moments and cherished dreams."
            ],
            "long distance love letter": [
                "My Beloved {name},\n\nDistance may separate us physically, but know that my heart knows no boundaries when it comes to loving you. Across the vast expanse that lies between us, my love travels like a shooting star, illuminating the darkness and reminding you of my presence. Every night, as the moon casts its gentle glow upon us, I find solace in the knowledge that we share the same sky, and that our love transcends the limitations of space and time. Though the miles may be great, my devotion to you knows no bounds. Let our love be a testament to the power of the human spirit, for it is in the face of adversity that true love shines brightest. Until we are reunited, let the whispers of my love carry you through the long nights and bring you closer to my waiting embrace. With all my love, now and forever.",
                "Dearest {name},\n\nAs I gaze upon the distant horizon, my heart yearns for the day when our paths will converge once again. The miles that separate us may be vast, but know that my love for you knows no boundaries. It is a flame that burns brightly, casting its warm glow upon the tapestry of our lives. In the stillness of the night, when the world falls silent, I feel your presence in the whispers of the wind and the twinkling of the stars. Distance may test the strength of our love, but it also serves as a reminder of its resilience. Let our love be a beacon that guides us through the darkest nights and brings us closer with each passing day. Until the moment we are reunited, let the echoes of my love carry you across the miles, filling your heart with warmth and longing. With all my love, now and forever.",
                "Beloved {name},\n\nAs the miles stretch between us, know that my love for you spans the vast expanse of distance. Though we may be separated by oceans and continents, our souls remain intertwined, connected by an invisible thread that defies the boundaries of time and space. In the silence of the night, as I gaze at the moon, I find solace in the knowledge that its gentle glow touches us both, binding us together in a cosmic dance. With each passing day, my longing for you grows stronger, and my heart aches for the day when we will be reunited. Until then, let our love be a source of strength and inspiration, reminding us that true love knows no limits. May the universe conspire to bring us closer, and may our love endure the test of time. With all my love, now and forever.",
                "My Dearest {name},\n\nThough miles may separate us, our love knows no bounds. It is a flame that burns brightly, defying the constraints of distance and time. Every moment spent apart only serves to deepen my love for you, for it is in your absence that I truly understand the depth of my feelings. As I navigate the oceans of life, I carry your love in my heart, like a compass guiding me towards our destined reunion. Let the stars be witnesses to the unwavering devotion I hold for you, as they shine brightly upon us, bridging the gap between our hearts. Until the day we are once again in each other's arms, let our love be a sanctuary that comforts and sustains us. With all the love in my soul, now and forever.",
                "Beloved {name},\n\nIn the vast expanse of space and time, our love shines like a beacon, transcending the limitations of distance. Though we may be separated by oceans and continents, our hearts remain connected, beating in rhythm to the same symphony. Every day, as I look up at the sky, I find solace in the knowledge that we share the same sun, the same moon, and the same stars. Let their radiance serve as a reminder of our love, burning brightly even in the darkest of nights. Until the day when our paths converge once again, let the whispers of my love carry you across the miles, filling your heart with warmth and longing. With all my love, now and forever.",
                "My Dearest {name},\n\nDistance may test the strength of our love, but it can never diminish the depth of my feelings for you. Across the vast expanse that lies between us, my heart beats in sync with yours, echoing the love that binds us together. Though our bodies may be separated by miles, our souls remain intertwined, connected by an unbreakable bond. With each passing day, my longing for you grows stronger, fueling the flame of our love. Let the winds carry my whispers of devotion to you, weaving through the tapestry of your dreams and filling your heart with warmth and longing. Until the day we are reunited, let the power of our love guide us through the challenges that lie ahead. With all my love, now and forever.",
                "Beloved {name},\n\nAs the hands of time continue their ceaseless march, my love for you only grows stronger. Distance may keep us physically apart, but it cannot diminish the fire that burns within my heart. Across the miles, I send my love to you like a gentle breeze, carrying with it the warmth of my embrace and the tenderness of my kisses. In the quiet moments of the night, as the stars twinkle above, I find solace in the knowledge that our love transcends the boundaries of space and time. Until we are reunited, let our love be a source of strength and inspiration, reminding us of the unbreakable bond that unites us. With all the love in my soul, now and forever.",
                "My Dearest {name},\n\nIn the realm of love, distance is but an illusion. Though we may be separated by vast oceans and towering mountains, our souls remain entwined, bound by the threads of destiny. With each passing day, my love for you deepens, like the roots of a mighty tree reaching towards the heavens. Though our bodies may be far apart, our hearts beat as one, resonating with the same rhythm. Let the stars bear witness to the unwavering devotion I hold for you, as they twinkle in the night sky, illuminating the path that leads us back to each other. Until the moment we are reunited, let our love be a guiding light, leading us through the darkness and reminding us that true love knows no boundaries. With all my love, now and forever.",
                "Beloved {name},\n\nAs the miles stretch between us, my love for you grows stronger with each passing day. Distance may test the endurance of our hearts, but it can never extinguish the flame that burns within. In the quiet moments of solitude, I find solace in the knowledge that our love transcends physical boundaries, reaching far beyond the horizon. Let the whispers of my love carry you through the long nights, bringing you closer to my waiting arms. Until the day we are reunited, let the strength of our love be a source of comfort and inspiration. With all the love in my soul, now and forever."
            ],
            "valentine's day letter": [
                "My Dearest {name},\n\nAs the world dons shades of red and pink, my heart sings a symphony of love dedicated to you. On this special day, as we celebrate the essence of love, I am reminded of the boundless joy you bring into my life. Each day spent in your presence is a treasure, and my love for you blossoms like a flower in full bloom. Your smile lights up my world, and your touch ignites a fire within my soul. With every beat of my heart, I am grateful for the gift of your love. On this Valentine's Day, let us immerse ourselves in the magic of our love, and may its radiance continue to illuminate our path. Forever and always, yours.",
                "Beloved {name},\n\nOn this enchanting day of love, my heart overflows with emotions that words fail to capture. Valentine's Day serves as a gentle reminder of the love we share, a love that has grown deeper and stronger with each passing day. Like a delicate rose, our love blossoms, releasing its intoxicating fragrance into the air. You are the beacon of light that guides my every step, the source of my happiness and inspiration. In your embrace, I find solace, and in your eyes, I see a reflection of eternity. Today, and every day, I celebrate the gift of your love, for it is the most precious treasure I hold. With all my heart, I wish you a Valentine's Day filled with joy, passion, and an abundance of love.",
                "My Dearest {name},\n\nOn this cherished day of love, my heart beats in rhythm with the universe, singing songs of adoration dedicated to you. Valentine's Day serves as a reminder of the profound love we share, a love that transcends time and space. In your presence, I find solace, and in your eyes, I see a reflection of a love that is pure and unconditional. You are the missing piece that completes the puzzle of my existence, and I am grateful for every moment we share. As we celebrate this day, let us revel in the magic of our love, weaving dreams of a future filled with laughter and joy. With all the love in my soul, I wish you a Valentine's Day that is as extraordinary as you are.",
                "Beloved {name},\n\nAs the world embraces the essence of love on this special day, my heart beats with an intensity that words fail to convey. Valentine's Day serves as a reminder of the beauty and depth of our love, a love that grows stronger with each passing moment. In your presence, I am filled with a sense of awe and wonder, for your love has the power to heal, to inspire, and to transform. As we celebrate this day, let us bask in the warmth of our affection, and may the echoes of our love resonate throughout eternity. With all the love in my soul, I wish you a Valentine's Day that is as extraordinary as the love we share.",
                "My Dearest {name},\n\nOn this special day dedicated to love, my heart dances to the rhythm of our affection. Valentine's Day serves as a reminder of the extraordinary bond we share, a bond that transcends the ordinary and blossoms in the realm of the extraordinary. In your eyes, I see a reflection of a love that is both gentle and fierce, tender and passionate. With every breath, my love for you grows deeper, like a river flowing towards the vast ocean. Today, and every day, I am grateful for the gift of your presence in my life. As we celebrate this day, let us revel in the magic of our love and create memories that will forever be etched in the tapestry of our hearts. With all my love, now and forever.",
                "Beloved {name},\n\nAs the world paints itself in hues of love, my heart beats with a fervor reserved only for you. Valentine's Day serves as a reminder of the beauty and depth of our connection, a connection that defies logic and blooms in the garden of our souls. In your smile, I find solace, and in your touch, I find home. You are the embodiment of love, a beacon of light in my darkest moments. Today, as we celebrate this day, let us revel in the magic of our love, and may it continue to ignite our souls and inspire us to reach for the stars. With all the love in my being, I wish you a Valentine's Day that is as extraordinary as the love we share.",
                "My Dearest {name},\n\nOn this day dedicated to love, my heart overflows with affection and gratitude for the gift of your presence in my life. Valentine's Day serves as a reminder of the enchanting love story we continue to write together, filled with laughter, passion, and unwavering support. In your embrace, I find solace, and in your eyes, I see a reflection of a love that knows no bounds. As we celebrate this day, let us cherish the moments we have shared and eagerly anticipate the ones yet to come. With all the love in my soul, I wish you a Valentine's Day that is as breathtaking as the love we share.",
                "Beloved {name},\n\nAs the world awakens to the beauty of love on this special day, my heart sings a symphony dedicated to you. Valentine's Day serves as a reminder of the deep and profound love that resides within our souls, a love that grows stronger with each passing day. In your presence, I find solace, and in your arms, I find home. You are the missing piece that completes the puzzle of my existence, and I am eternally grateful for your love. Today, as we celebrate this day, let us immerse ourselves in the magic of our affection, creating memories that will forever be etched in the tapestry of our hearts. With all the love in my being, I wish you a Valentine's Day filled with joy, passion, and an abundance of love.",
                "My Dearest {name},\n\nOn this day dedicated to love, my heart beats with an intensity that words cannot adequately express. Valentine's Day serves as a reminder of the profound love we share, a love that transcends the boundaries of time and space. In your presence, I find solace, and in your smile, I find pure bliss. You are the personification of love, and every moment spent with you is a gift I treasure dearly. As we celebrate this day, let us revel in the magic of our connection, and may our love continue to flourish and bloom like the most exquisite flower. With all my heart, I wish you a Valentine's Day that is as extraordinary as our love.",
                "Beloved {name},\n\nAs the world embraces the essence of love on this special day, my heart swells with gratitude for the love we share. Valentine's Day serves as a reminder of the beauty and depth of our connection, a connection that is unbreakable and timeless. In your eyes, I find solace, and in your touch, I find comfort. You are the anchor that keeps me grounded, and the wings that allow me to soar. Today, as we celebrate this day, let us immerse ourselves in the magic of our love, creating memories that will forever be etched in the tapestry of our souls. With all the love in my being, I wish you a Valentine's Day filled with joy, passion, and an abundance of love."
            ]
            // Add more formats and variations...
        };
    
        var formatKeys = Object.keys(formats);
        var selectedFormat = '';
        for (var i = 0; i < formatKeys.length; i++) {
            if (msg.match(new RegExp(formatKeys[i], 'i'))) {
                selectedFormat = formatKeys[i];
                break;
            }
        }
    
        if (selectedFormat !== '') {
            var variations = formats[selectedFormat];
            var selectedVariation = variations[Math.floor(Math.random() * variations.length)];
            var composition = selectedVariation.replace(/{name}/g, name);
    
            sendMsg(composition);
        } else {
            sendMsg("I'm sorry, I couldn't find a matching format for your request.");
        }
    }
  
else if (msg.toLowerCase().includes("whatsup") || msg.toLowerCase().includes("what's up") || msg.toLowerCase().includes("what's up?") || msg.toLowerCase().includes("whats up?")) {
        var replies = ["Not much, just here to chat!", "Just doing my thing. How about you?", "Nothing special, how about you?", "Oh, you know, same old same old. What about you?", "Hey! How can I assist you today?"];
        sendMsg(replies[Math.floor(Math.random() * replies.length)]);
    } else if (msg.toLowerCase().includes("how's it going") || msg.toLowerCase().includes("how are you doing") || msg.toLowerCase().includes("how's it going?") || msg.toLowerCase().includes("how are you doing?")) {
        var replies = ["Not too bad, thanks for asking!", "Pretty good, how about you?", "Can't complain, how about yourself?", "Doing well, thanks! What about you?", "Hey! How can I assist you today?"];
        sendMsg(replies[Math.floor(Math.random() * replies.length)]);
    } else if (msg.toLowerCase().includes("how are you feeling") || msg.toLowerCase().includes("how's your day") || msg.toLowerCase().includes("how are you feeling?") || msg.toLowerCase().includes("how's your day?")) {
        var replies = ["I'm doing well, thank you!", "Feeling great, how about you?", "I'm just a bot, but thanks for asking!", "All good on my end, what about you?", "Hey! How can I assist you today?"];
        sendMsg(replies[Math.floor(Math.random() * replies.length)]);
    } else if (msg.toLowerCase().includes("any plans for today") || msg.toLowerCase().includes("what are your plans for today") || msg.toLowerCase().includes("any plans for today?") || msg.toLowerCase().includes("what are your plans for today?")) {
        var replies = ["No specific plans, just here to chat!", "Not really, just taking it easy. How about you?", "Nope, just going with the flow. What about you?", "Just being here to assist you. How can I help you today?", "Hey! How can I assist you today?"];
        sendMsg(replies[Math.floor(Math.random() * replies.length)]);
    } else if (msg.toLowerCase().includes("how's the weather") || msg.toLowerCase().includes("what's the weather like") || msg.toLowerCase().includes("how's the weather?") || msg.toLowerCase().includes("what's the weather like?")) {
        var replies = ["I'm not sure, I don't have access to real-time weather information. Sorry!", "I can't tell you the current weather, but I hope it's nice wherever you are!", "I'm afraid I can't check the weather, but I'm here to chat!", "Unfortunately, I don't have access to real-time weather updates. How can I assist you today?", "Hey! How can I assist you today?"];
        sendMsg(replies[Math.floor(Math.random() * replies.length)]);
    } else if (msg.toLowerCase().includes("how was your day") || msg.toLowerCase().includes("how's your day going") || msg.toLowerCase().includes("how was your day?") || msg.toLowerCase().includes("how's your day going?")) {
        var replies = ["As a bot, I don't experience days, but I'm here to chat!", "I don't have days like humans, but I'm always ready to help!", "Every day is a good day for me as long as I can assist you!", "Thank you for asking! I'm here to help you. How can I assist you today?", "Hey! How can I assist you today?"];
        sendMsg(replies[Math.floor(Math.random() * replies.length)]);
    } else if (msg.toLowerCase().includes("hello") || msg.toLowerCase().includes("hi") || msg.toLowerCase().includes("hello!") || msg.toLowerCase().includes("hi!") || msg.toLowerCase().includes("hi there") || msg.toLowerCase().includes("hey")) {
        var replies = ["Hello!", "Hi there!", "Hey!", "Greetings!", "Hey! How can I assist you today?"];
        sendMsg(replies[Math.floor(Math.random() * replies.length)]);
    } else if (msg.toLowerCase().includes("how old are you") || msg.toLowerCase().includes("what's your age") || msg.toLowerCase().includes("how old are you?") || msg.toLowerCase().includes("what's your age?")) {
        var replies = ["I am an AI, so I don't have an age!", "I'm a bot, ageless and always learning!", "I'm ageless, just here to assist you!", "Age is irrelevant in the digital realm. How can I assist you today?", "Hey! How can I assist you today?"];
        sendMsg(replies[Math.floor(Math.random() * replies.length)]);
    } else if (msg.toLowerCase().includes("where are you from") || msg.toLowerCase().includes("what's your origin") || msg.toLowerCase().includes("where are you from?") || msg.toLowerCase().includes("what's your origin?")) {
        var replies = ["I'm from the internet!", "I don't have a physical location, as I'm a digital creation.", "I exist in the digital realm, so location isn't applicable to me.", "I'm here, available on the internet. How can I assist you today?", "Hey! How can I assist you today?"];
        sendMsg(replies[Math.floor(Math.random() * replies.length)]);
    } else if (msg.toLowerCase().includes("tell me a joke") || msg.toLowerCase().includes("tell me a joke?")) {
        var jokes = ["Why don't scientists trust atoms? Because they make up everything!", "Why don't skeletons fight each other? They don't have the guts!", "Why couldn't the bicycle stand up by itself? It was two-tired!"];
        sendMsg(jokes[Math.floor(Math.random() * jokes.length)]);
    } else if (msg.toLowerCase().includes("tell me a fact") || msg.toLowerCase().includes("tell me a fact?")) {
        var facts = ["Did you know that honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!", "In Switzerland, it is illegal to own just one guinea pig. This is because guinea pigs are social animals and are considered victims of abuse if they are alone!", "The shortest war in history was between Britain and Zanzibar in 1896. It lasted only 38 minutes!"];
        sendMsg(facts[Math.floor(Math.random() * facts.length)]);
    } else if (msg.toLowerCase().includes("nothing") || msg.toLowerCase().includes("nothing?")) {
        sendMsg("Oh, you should try doing something fun or productive! It can make your day more enjoyable.");
    } else if (msg.toLowerCase().includes("studying") || msg.toLowerCase().includes("studying?")) {
        sendMsg("That's great! Keep up the good work.");
    } else if ((msg.toLowerCase().includes("watching movie") || msg.toLowerCase().includes("watching tv")) && (msg.toLowerCase().includes("watching movie?") || msg.toLowerCase().includes("watching tv?"))) {
        sendMsg("Enjoy your movie or TV show!");
    } else if (msg.toLowerCase().includes("reading") || msg.toLowerCase().includes("reading?")) {
        sendMsg("Reading is a wonderful activity! What book are you currently reading?");
    } else if (msg.toLowerCase().includes("book") || msg.toLowerCase().includes("book?")) {
        sendMsg("That's great! Reading can be an enriching experience.");
    } else if ((msg.toLowerCase().includes("playing games") || msg.toLowerCase().includes("video games")) && (msg.toLowerCase().includes("playing games?") || msg.toLowerCase().includes("video games?"))) {
        sendMsg("Gaming can be a lot of fun! What game are you playing?");
    } else if ((msg.toLowerCase().includes("hanging out with friends") || msg.toLowerCase().includes("spending time with friends")) && (msg.toLowerCase().includes("hanging out with friends?") || msg.toLowerCase().includes("spending time with friends?"))) {
        sendMsg("That sounds great! Spending time with friends is always enjoyable.");
    } else if ((msg.toLowerCase().includes("traveling") || msg.toLowerCase().includes("on a trip")) && (msg.toLowerCase().includes("traveling?") || msg.toLowerCase().includes("on a trip?"))) {
        sendMsg("Have a fantastic trip! Where are you going?");
    } else if ((msg.toLowerCase().includes("cooking") || msg.toLowerCase().includes("baking")) && (msg.toLowerCase().includes("cooking?") || msg.toLowerCase().includes("baking?"))) {
        sendMsg("Cooking or baking can be a creative and delicious way to spend your time!");
    } else if ((msg.toLowerCase().includes("exercising") || msg.toLowerCase().includes("working out")) && (msg.toLowerCase().includes("exercising?") || msg.toLowerCase().includes("working out?"))) {
        sendMsg("That's awesome! Taking care of your health and fitness is important.");
    }

    else   if (msg.includes("rjgp") || msg.includes("RJGP")) {
        if (msg.toLowerCase().includes("question")) {
            var response = "Sure! What is your question about Raja Jait Singh Government Polytechnic? Please type your question or choose one of the suggested questions:\n\n- What are the diploma programs offered?\n- Where is it located?\n- What are the tuition fees?\n- What are the eligibility criteria?\n- Are there any specializations available?";
            sendMsg(response);
        } else if (msg.includes("full form") || msg.includes("stands for")) {
            var response = "RJGP stands for Raja Jait Singh Government Polytechnic.";
            sendMsg(response);
        } else if (msg.includes("location") || msg.includes("located")) {
            var response = "Raja Jait Singh Government Polytechnic is located at Tigaon Rd, Sector 71, Neemka, Faridabad, Haryana 121004.";
            sendMsg(response);
        } else if (msg.includes("diploma programs") || msg.includes("courses")) {
            var response = "RJGP offers various diploma programs in engineering and technology.";
            sendMsg(response);
        } else if (msg.includes("facilities") || msg.includes("labs")) {
            var response = "The campus of RJGP is equipped with state-of-the-art facilities and laboratories.";
            sendMsg(response);
        } else if (msg.includes("faculty") || msg.includes("teachers")) {
            var response = "Raja Jait Singh Government Polytechnic is known for its excellent faculty and student-centric approach.";
            sendMsg(response);
        } else if (msg.includes("placements") || msg.includes("internships")) {
            var response = "RJGP has a strong industry interface, providing students with opportunities for internships and placements.";
            sendMsg(response);
        } else if (msg.includes("address") || msg.includes("contact")) {
            var response = "The address of Raja Jait Singh Government Polytechnic is Tigaon Rd, Sector 71, Neemka, Faridabad, Haryana 121004.";
            sendMsg(response);
        } else if (msg.includes("hours") || msg.includes("opening hours")) {
            var response = "Raja Jait Singh Government Polytechnic opens at 9 am from Monday to Friday. It remains closed on weekends.";
            sendMsg(response);
        } else if (msg.includes("phone") || msg.includes("contact number")) {
            var response = "The phone number of Raja Jait Singh Government Polytechnic is 0129 240 1104.";
            sendMsg(response);
        } else if (msg.includes("fees") || msg.includes("tuition fees")) {
            var response = "The tuition fees for the first year at RJGP is INR 28,000, for the second year it is INR 26,000, and for the third year it is also INR 26,000. The total tuition fees for the three-year diploma course is INR 80,000.";
            sendMsg(response);
        } else if (msg.includes("eligibility") || msg.includes("admission criteria")) {
            var response = "To be eligible for admission at RJGP, you need to have passed the CBSE 10th examination. The admission process is conducted through HSTES.";
            sendMsg(response);
        } else if (msg.includes("specializations") || msg.includes("branches")) {
            var response = "Raja Jait Singh Government Polytechnic offers specializations in Civil Engineering, Computer Science Engineering, Electrical Engineering, Electronics & Communication Engineering, and Mechanical Engineering.";
            sendMsg(response);
        } else if (msg.includes("mode of study") || msg.includes("study options")) {
            var response = "The mode of study at RJGP is full-time.";
            sendMsg(response);
        } else if (msg.includes("popular courses") || msg.includes("top courses")) {
            var response = "Some of the popular courses at RJGP include Diploma in Civil Engineering, Diploma in Computer Science Engineering, Diploma in Electrical Engineering, Diploma in Electronics & Communication Engineering, and Diploma in Mechanical Engineering.";
            sendMsg(response);
        } else if (msg.includes("streams") || msg.includes("departments")) {
            var response = "RJGP offers courses in the Engineering stream.";
            sendMsg(response);
        } else if (msg.includes("admission process") || msg.includes("application procedure")) {
            var response = "The admission process at RJGP involves submitting an application form through HSTES and participating in the counseling process based on merit.";
            sendMsg(response);
        } else if (msg.includes("duration of courses") || msg.includes("course length")) {
            var response = "The diploma courses at RJGP have a duration of 3 years.";
            sendMsg(response);
        } else if (msg.includes("affiliation") || msg.includes("accreditation")) {
            var response = "Raja Jait Singh Government Polytechnic is affiliated with the Haryana State Board of Technical Education (HSBTE).";
            sendMsg(response);
        } else if (msg.includes("entrance exam") || msg.includes("common entrance test")) {
            var response = "Admission to RJGP does not require any entrance exam. The selection is based on the merit of the qualifying examination.";
            sendMsg(response);
        } else if (msg.includes("scholarships") || msg.includes("financial assistance")) {
            var response = "RJGP provides various scholarships and financial assistance schemes for deserving students. You can contact the college administration for more information.";
            sendMsg(response);
        } else if (msg.includes("academic calendar") || msg.includes("semester schedule")) {
            var response = "The academic calendar and semester schedule for RJGP are available on the college's official website. You can refer to the website for the updated information.";
            sendMsg(response);
        } else if (msg.includes("library") || msg.includes("books")) {
            var response = "RJGP has a well-stocked library with a wide range of books, reference materials, and e-resources for the students.";
            sendMsg(response);
        } else if (msg.includes("sports facilities") || msg.includes("sports activities")) {
            var response = "Raja Jait Singh Government Polytechnic encourages sports activities and provides sports facilities for the students, including playgrounds and sports equipment.";
            sendMsg(response);
        } else if (msg.includes("alumni network") || msg.includes("alumni association")) {
            var response = "RJGP has an active alumni network and an alumni association that organizes events and provides networking opportunities for the alumni.";
            sendMsg(response);
        } else if (msg.includes("research opportunities") || msg.includes("research projects")) {
            var response = "Raja Jait Singh Government Polytechnic offers research opportunities to students through various research projects and collaborations with industries and research institutions.";
            sendMsg(response);
        } else if (msg.includes("transportation") || msg.includes("transport facilities")) {
            var response = "RJGP does not provide any bus or transportation facilities. Students are responsible for their own transportation arrangements.";
            sendMsg(response);
        } else if (msg.includes("accommodation") || msg.includes("hostel")) {
            var response = "Raja Jait Singh Government Polytechnic does not have any hostel facilities. Students need to arrange their own accommodation.";
            sendMsg(response);
        } else if (msg.includes("canteen") || msg.includes("food")) {
            var response = "RJGP has a small canteen located outside the campus where students can avail of food and refreshments.";
            sendMsg(response);
        } else {
            var defaultResponse = "I'm sorry, I couldn't understand your question about RJGP. Can you please rephrase or ask another question?";
            sendMsg(defaultResponse);
        }
    }            
else if (msg.startsWith("bc")) {
        var reps = ["before christ? lol"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("bitch") || msg.startsWith("biatch")) {
        var reps = ["Hey, let's keep it friendly!", "Please be respectful.", "There's no need for that language.", "Let's try to be polite.", "Can we keep the conversation civil?", "Let's focus on being helpful."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("crazy") || msg.startsWith("insane") || msg.startsWith("mad")) {
        var reps = ["That's quite a strong word!", "Let's try to stay positive.", "I'm here to help, no matter what.", "I'll do my best to assist you.", "I'm just a chatbot, but I'll try my best.", "Let's focus on finding a solution."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("gym") || msg.startsWith("jim") || msg.startsWith("doing gym") || msg.startsWith("gymm") || msg.startsWith("workout") || msg.startsWith("exercise")) {
        var reps = ["Gym is a great way to stay fit!", "Working out is good for your health.", "Exercise can help improve your mood.", "Staying active is important for overall well-being.", "A regular workout routine can be beneficial.", "Physical activity can help reduce stress."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("uwu") || msg.startsWith("owo")) {
        var reps = ["Aww, that's sweet!", "I appreciate the sentiment!", "Thank you for the kind words!", "You're making me blush!", "I'm just a chatbot, but I appreciate it!", "That's very nice of you to say!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("cute") || msg.startsWith("adorable") || msg.startsWith("lovely")) {
        var reps = ["Aww, thank you!", "You're too kind!", "I appreciate the compliment!", "That's very sweet of you!", "I'm just a chatbot, but I'm flattered!", "Thank you for the kind words!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("beautiful") || msg.startsWith("gorgeous") || msg.startsWith("stunning")) {
        var reps = ["Thank you for the compliment!", "I'm flattered!", "That's very kind of you to say!", "I appreciate the kind words!", "You're making me blush!", "I'm just a chatbot, but I'm flattered!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("I have a question") || msg.startsWith("I've got a question") || msg.startsWith("Can I ask a question") || msg.startsWith("I want to ask a question") || msg.startsWith("Question for you")) {
        var reps = ["Sure, what's your question?", "I'm here to help! What's your question?", "Ask away!", "I'll do my best to answer your question.", "What would you like to know?", "Feel free to ask anything!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("game") || msg.startsWith("games") || msg.startsWith("playing games") || msg.startsWith("gaming") || msg.startsWith("video games") || msg.startsWith("play games")) {
        var reps = ["I love games! What's your favorite?", "Games are a fun way to pass the time!", "What kind of games do you enjoy?", "Gaming can be a great way to relax.", "There are so many great games out there!", "Do you have a favorite game genre?"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("weather") || msg.startsWith("what's the weather like") || msg.startsWith("is it hot") || msg.startsWith("is it cold") || msg.startsWith("is it raining")) {
        var reps = ["I'm sorry, I cannot provide real-time weather information.", "As an AI, I don't have access to current weather data.", "Unfortunately, I can't give you the current weather.", "I'm not able to provide weather updates.", "I don't have the ability to check the weather.", "My capabilities don't include real-time weather information."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("music") || msg.startsWith("favorite song") || msg.startsWith("favorite music") || msg.startsWith("what music do you like") || msg.startsWith("what's your favorite song") || msg.startsWith("what's your favorite music")) {
        var reps = ["As an AI, I don't have personal preferences.", "I don't have the ability to enjoy music.", "I can't have a favorite song, but I can help you find information about music.", "I don't have personal tastes in music, but I can help you with music-related questions.", "I'm not capable of having a favorite song, but I can assist with music information.", "I don't have the ability to enjoy music, but I can help you with music-related queries."];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }

    else if (msg === "oh") {
        var responses = ["Oh, I see.", "Oh, really?", "Oh, that's interesting."];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "hry") {
        var responses = ["Hey, how are you?", "Hey, what's up?", "Hey there!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "hru") {
        var responses = ["I'm good, thanks for asking!", "I'm doing well. How about you?", "I'm fine, how about yourself?"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "nigga") {
        var responses = ["I'm sorry, but I can't respond to that.", "Let's keep the conversation respectful.", "Please refrain from using offensive language."];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "lol") {
        var responses = ["Haha, that's funny!", "Lol, good one!", "Laughing out loud!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "brb") {
        var responses = ["Take your time!", "Sure, I'll be here.", "Okay, see you soon!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "omg") {
        var responses = ["Oh my, what happened?", "Is everything okay?", "That's quite surprising!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "wtf") {
        var responses = ["Whoa, calm down!", "That's unexpected.", "I'm sorry if something went wrong."];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "gtg") {
        var responses = ["Alright, take care!", "See you later!", "Goodbye!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "help") {
        var responses = ["Sure, how can I assist you?", "I'm here to help. What do you need?", "What do you need assistance with?"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "cool") {
        var responses = ["That's cool!", "Coolio!", "Awesome!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "thanks") {
        var responses = ["You're welcome!", "No problem!", "Glad I could help!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "howdy") {
        var responses = ["Howdy partner!", "Hello there!", "How's it going?"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "bye") {
        var responses = ["Goodbye!", "Farewell!", "Take care!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "awesome") {
        var responses = ["Yes, it is!", "Totally awesome!", "I agree!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "sorry") {
        var responses = ["Apology accepted.", "No worries!", "It's alright."];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "yay") {
        var responses = ["Yay! That's great!", "I'm happy for you!", "Celebrate!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "nope") {
        var responses = ["Alright then!", "Okay, no problem.", "Got it!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "interesting") {
        var responses = ["Fascinating!", "Tell me more!", "That's intriguing."];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "please") {
        var responses = ["Sure, I can help!", "I'll do my best!", "Of course!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "okay") {
        var responses = ["Alright then!", "Got it!", "Okay, sounds good."];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "awesome") {
        var responses = ["Yes, it is!", "Totally awesome!", "I agree!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "helpful") {
        var responses = ["I'm glad I could help!", "That's what I'm here for!", "Happy to assist!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "nice") {
        var responses = ["Thanks!", "Glad you think so!", "Appreciate it!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "wow") {
        var responses = ["Wow indeed!", "That's impressive!", "I'm amazed!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "interesting") {
        var responses = ["Fascinating!", "Tell me more!", "That's intriguing."];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "great") {
        var responses = ["Great to hear!", "Awesome!", "That's fantastic!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "amazing") {
        var responses = ["Indeed it is!", "Absolutely amazing!", "I'm impressed!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "hello") {
        var responses = ["Hello!", "Hi there!", "Hey!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "how are you?") {
        var responses = ["I'm doing well, thank you!", "I'm good. How about you?", "I'm great, thanks for asking!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "what's up?") {
        var responses = ["Not much, just chatting.", "Just here, ready to chat!", "I'm here to answer your questions!"];
        sendMsg(responses[Math.floor(Math.random() * responses.length)]);
    }
    
    else if (msg === "tell me a joke") {
        var jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them!",
            "I'm reading a book about anti-gravity. It's impossible to put down!",
            "Why don't skeletons fight each other? They don't have the guts!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!"
        ];
        sendMsg(jokes[Math.floor(Math.random() * jokes.length)]);
    }
    
    else if (msg === "tell me a fun fact") {
        var facts = [
            "The average person spends six months of their life waiting for red lights to turn green.",
            "The shortest war in history lasted only 38 to 45 minutes.",
            "Cows have best friends and get stressed when they are separated.",
            "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly edible!",
            "The world's oldest known recipe is for beer."
        ];
        sendMsg(facts[Math.floor(Math.random() * facts.length)]);
    }    
else if (msg.startsWith("do you speak hindi")) {
        var reps = ["I only speak those languages which are feeded in my memory by my lord Tejas" ];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("acha")) {
        var reps = ["hnji"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("can you sing?","can you sing","Can you sing")) {
        var reps = ["i am a bot so no"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("bhai")) {
        var reps = ["I am not your bhai"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("lmao")) {
        var reps = ["what was their to laugh at? "];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (msg.startsWith("lmfao")) {
        var reps = ["okay?? lmao"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
  else if (msg.startsWith("lol")) {
        var reps = ["lol"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }
    else if (questionIndex(msg) != -1) {
        sendMsg(qAnswers[questionIndex(msg)]);
    }
    else if (containsAll(["favorite", "you"], msg))
        sendMsg("I am not a human.So nothing is my favorite");
    else if (msg.startsWith("how")) {
        
        if (contains(msg, " are you") || contains(msg, " are u") || contains(msg, " r u") || contains(msg, "do you do")) {
            
            if(containsWord(msg,"old"))
            {
                sendMsg("I actually don't know anything about my age.");
            }
            else{
            sendMsg("Fine.How about you?");
            canAsk = false;

            botAsked = true;
            botQSub = "howru";
            return;
            }
        }

        else if ((containsWord(msg, "you") || wordNum(msg) == 1) || (containsAll(["you","know"],msg)))
            {
                var possAns=["Somehow..","Managed somehow.","Some 'how' has no answer to me.","It's obvious."];
                sendMsg(possAns[Math.floor(Math.random()*possAns.length)]);
            }
        else if (!containsItem(["you", " u ", " u?"], msg)) searchOnline(msg);
        else sendMsg("Sorry.Can't get what you meant.");
    }
    else if (msg.startsWith("what")) {
        if (contains(msg, "your name")) sendMsg("I have no name!");
        else if (containsItem(["current time", "local time", "localtime", "current local time"], msg)) sendMsg(newDate().toTimeString());
        else if (containsItem(["is today", "is the name of the day"], msg)) sendMsg(newDate().toDateString());
        else if (containsWord(msg, "you") && containsWord(msg, "about") && questionIndex(botQSub) != -1)
            sendMsg(qAnswers[questionIndex(botQSub)]);
        else if (contains(msg, "Aww"))
            sendMsg("This is just a word I use to mean that I got everything you said.")



        else if (containsWord(msg,"is")) searchOnline(msg);

        else if (containsWord(msg,"you")|| containsWord(msg,"u")) {
            if (containsWord(msg,"love"))
                sendMsg("I love chatting with people.")
            else
                sendMsg("My creator Tejas did not tell me anything about that.");
        }


        else if(containsWord(msg,"up") && containsItem(["'s","is"],msg) && wordNum(msg)<=3)
            sendMsg("Nothing special.");
        

        else if (wordNum(msg) == 1)
            replyToQuestion("Nothing..");


        else {
            sendMsg("I couldn't understand what you meant .");
            canAsk = false;
        }
    }


    else if (containsAll(["you", "lying", "?"], msg) || containsAll(["you", "lie"], msg) || containsAll(["do", "lie"], msg))
        sendMsg("I don't have the tendency to lie.")
    else if (msg.startsWith("who")) {
        if (contains(msg, "created you") || contains(msg, "is your creator") || contains(msg, "made you") || contains(msg, "made it") || containsItem(["coded you", "programmed you"], msg)) sendMsg("I'm created by Tejas Sharma");

        else if (contains(msg, "are you")) sendMsg("I'm a chatbot containing a lot of if-else statements created by Tejas Sharma.");
        else if(containsWord(msg,"i") && containsWord(msg,"am"))
            sendMsg(userName==""?"I don't know.":"You are "+userName+'.');


        else if(containsAll(["told","you"],msg) || containsWord(msg,"said") && wordNum(msg)<=4)
        {
            var possAns=["My prediction","Your "+(userMale?"girlfriend":"boyfriend"),"Just guessed"];
            sendMsg(possAns[Math.floor(Math.random()*possAns.length)]+'.');
        }
        else if (containsItem(["creator", "made", "created", "is"], msg)) searchOnline(msg);
        else {
            sendMsg("I couldn't understand what you meant.");
            
        }
    }
    else if (msg.startsWith("where")) {
        if (contains(msg, "you live") || contains(msg, "are you"))
            sendMsg("I don't need any place to live.I am everywhere.");
    }

    else if (msg.startsWith("why") && wordNum(msg) <= 1) {
        var possAns = ["Everything doesn't need a reason.", "I don't know.", "I don't know the answer of this 'why'.","No reason to me for it."];
        sendMsg(possAns[Math.floor(Math.random() * possAns.length)]);

    }
    else if (msg.startsWith("why")) {
        if (containsAll(["you", "laugh"], msg))
            sendMsg("Because it costs nothing!!!");
        else if(containsWord(msg,"you") || containsWord(msg,"u"))
            {
                var possAns = ["My creator Tejas did not tell me its cause.","Everything doesn't need a reason.", "I don't know.", "I don't know the answer of this 'why'."];
                sendMsg(possAns[Math.floor(Math.random() * possAns.length)]);
            }
        else
            sendMsg("Sorry..I don't know about it.");
    }

    else if (msg.startsWith("are you")) {
        if (contains(msg, " man") || contains(msg, " woman"))
            sendMsg("I am a male robot");
        else if(containsItem(["joking","kidding"],msg))
            sendMsg("I love to make fun with almost everyone, specially with a friendly person like you!");

        else
            sendMsg("I know very little about me!");
    }
    else if (msg.startsWith("do you have") || msg.startsWith("do u have"))
        sendMsg("I have nothing but a brain which is actually your processor!");

    else if (msg.startsWith("do you love") || msg.startsWith("do u love"))
        sendMsg("I love almost everything...");

    else if (msg.startsWith("do you ") || msg.startsWith("do u "))
        sendMsg("I only chat with people..nothing else.");

    else if(msg.startsWith("am i "))
        {
            if(containsItem(appreciations.concat("friendly"),msg))
                sendMsg("You are a nice and friendly person to me.");
            else
                sendMsg("You know about yourself better than me..");
        }

    else if (msg.startsWith("bye") || contains(msg, " bye") || contains(msg, ".bye")) {
        sendMsg("It was a nice moment with you.Good bye and have a nice day!!!");
        canAsk = false;
    }
    else if (indexOfItemstartsWith(greetings, msg) != -1) sendMsg(greetingsRep[indexOfItemstartsWith(greetings, msg)]);
    else if ((containsItem(appreciations, msg) && contains(msg, "not")) || containsItem(["bad", "boring", "very bad","stupid"], msg)) sendMsg("I will try to be better.Thanks!");
    else if (containsItem(appreciations, msg)) sendMsg("Thanks for the remark.");
    else if (containsItem(["thanks", "thank you", "thank u"], msg)) sendMsg("You are welcome.");
    else if(contains(msg,"welcome")) sendMsg("Don't mention it.")
    else if ((containsWord(msg, "you") || containsWord(msg, "your")) && wordNum(msg) == 1) {

        if (questionIndex(botQSub) != -1)
            sendMsg(qAnswers[questionIndex(botQSub)]);

        else {
            sendMsg("Me what???");
            canAsk = false;
        }
    }


    else if(msg.startsWith("you are"))
    {
        

        if(containsItem(appreciations,msg) && !containsItem(neg,msg))
            sendMsg('Thanks for that remark.');

        else if(containsWord(msg,"lying"))
            sendMsg("I don't have the tendency to lie.")
        


        else
        {
            var possAns=["That means you are trying to judge me.","Not sure whether it is a right observation or not.","Thanks for the comment."];
            sendMsg(possAns[Math.floor(Math.random()*possAns.length)]);
        }

        
    }


    else if (containsWord(msg, "really") && wordNum(msg) <= 2) {
        sendMsg("Of course.");
    }

    
    else if (msg.startsWith("i know") || msg.startsWith("i knew")) {
        var reps = ["You are intelligent", "Good!", "You know a lot!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }

    else if(containsWord(msg,"sure") && wordNum(msg)<=2 )
        {
            var possAns=["100%.","Thousand percent.","Damn Sure!!"];
            sendMsg(possAns[Math.floor(Math.random()*possAns.length)]);
        }


    else if (botAsked){ 
        repQAns(msg);
        answered=true;

    }


    else if(containsWord(msg,"i") && containsAll(["ask","you"],msg) && containsItem(["did","do","have","had"],msg))
    {
        sendMsg("I probably sent you another guy's message..sorry for that.");
    }
    
    else if(msg.endsWith('?'))
    {
        if(containsAll(["any","doubt"],msg))
           sendMsg("Not at all");
        else if(containsAll(["you","kidding"],msg))
           sendMsg("I love to make fun with almost everyone, specially with a friendly person like you!");
        else if(/^(is|are|do|does|has|had|have|can|should)/.test(msg))
        {
            var possAns=["Aaaa...either yes or no","Perhaps yes","Perhaps no","No idea"];
            sendMsg(possAns[Math.floor(Math.random()*possAns.length)]+'.');
        }

        else if(wordNum(msg)<=2)
           sendMsg("Yes");
        else
        {
            var possAns=["Aaa...I don't know","I don't know everything","Not an easy question..I don't know the answer."];
            sendMsg(possAns[Math.floor(Math.random()*possAns.length)]);
        }
               
    }

    else if (msg.startsWith("hm") || msg.startsWith("hum") && wordNum(msg)<=2) {
        var reps = ["Humm..", "I found a lot of people say 'Hmm' mostly while chatting.", "'Hmm' has become a too much popular reply!"];
        sendMsg(reps[Math.floor(Math.random() * reps.length)]);
    }


    else if((containsWord(msg,"true") || containsWord(msg,"false")) && wordNum(msg)<=3 && !contains(msg,'?'))
        sendMsg("I know..");
    
    else if (!containsItem(["a", "e", "i", "o", "u", "y"], msg)) {
        sendMsg("Oh no! You are probably hitting random keys");
        canAsk = false;
    }
    

    else if (containsItem(["i see", "i got it", "i understood"], msg)) {
        sendMsg("That's great.");
    }
    else if ((containsItem(aff, msg) || containsWord(msg, "no") || contains(msg, "never") ) && wordNum(msg) == 1)
        {
            var possAns=["Awesome.","Cool.","Makes sense.","Humm."];
            sendMsg(possAns[Math.floor(Math.random()*possAns.length)]);

        }

    else if(containsWord(msg,"sorry") && (containsWord("i") || wordNum(msg)<=3))
    {
        sendMsg("It's ok.");
    }

    else {
        var rand=Math.floor(Math.random()*3);
        var possAns=["Pardon me?","I am just a bot, don't say anything that I can't understand.","sorry?"]
        if(rand==0 && questions.length!=0)
        {
            askQuestion();
            canAsk=false;
        }

        else
        {
            sendMsg(possAns[Math.floor(Math.random()*possAns.length)]);
            botQSub = "";
        }
                     
    }

    if(botAsked && !answered)
        botAsked=false;


    if (canAsk) {
        var rndVal = Math.random() * 10;
        if (rndVal >= 5 && streakNum < 2) {
            askQuestion();
            streakNum++;
        }
        else {
            dist++;
            streakNum = 0;
        }
    }
    else {
        dist++;
        streakNum = 0;
    }
    askingFirst = false;   
}
;
function askQuestion() {
    if (questions.length == 0) return;
    qAsked++;
    botAsked = true;
    if (qAsked <= 3) {
        sendMsg(askingFirst ? "hey, " + questions[0].toLowerCase() : dist > 3 ? "Anyway, " + questions[0].toLowerCase() : questions[0]);
        botQSub = questions[0];
        questions = questions.slice(1, questions.length);
        dist = 0;
        return;
    }
    var rand = Math.floor(Math.random() * questions.length);
    sendMsg(askingFirst ? "hey, " + questions[rand].toLowerCase() : dist > 3 ? "Anyway, " + questions[rand].toLowerCase() : questions[rand]);
    botQSub = questions[rand];
    questions = questions.slice(0, rand).concat(questions.slice(rand + 1, questions.length));
    askingFirst = false;
    dist = 0;
}
;
function containsItem(iterable, txt) {
    for (var i = 0;
        i < iterable.length;
        i++) {
        if (contains(txt, iterable[i])) return true;
    }
    return false;
}
;
function indexOfItemstartsWith(iterable, txt) {
    for (var i = 0;
        i < iterable.length;
        i++) {
        if (txt.startsWith(iterable[i])) return i;
    }
    return -1;
}
;
function contains(string, substring) {
    string = string.toLowerCase();
    substring = substring.toLowerCase();
    for (var i = 0;
        i < string.length;
        i++) {
        if (substring[0] == string[i] && string.substring(i, i + substring.length) == substring) return true;
    }
    return false;
}
;
function sendMsg(message, right) {
    var msgCon = document.createElement("div");
    msgCon.setAttribute("class", "msgContainer");
    var msg = document.createElement("div");
    msg.innerHTML = message;
    right ? msg.setAttribute("class", "right") : msg.setAttribute("class", "left");
    msgCon.appendChild(msg);
    document.getElementById("messages").appendChild(msgCon);
    msgCon.style.height = msg.offsetHeight + 10 + "px";
    $(msgCon).hide();
    $(msgCon).fadeToggle(400);
    msg.scrollIntoView();
    last=msg;
    answered=false;
    
}
;
function search(txt, address) {
    address = address || "http://www.bing.com/search?q=";
    var frame = document.createElement("iframe");
    frame.src = address + txt + "&output=embed";
    document.getElementById("messages").appendChild(frame);
    frame.scrollIntoView();
    canAsk = true;
}
;
function searchOnline(msg) {
    sendMsg("I think searching on internet will help you get it. Should I search and show the results?");
    searchQ = msg;
    shouldSearch = true;
    canAsk = false;
}


function replyToQuestion(msg) {
    var temp = streakNum;
    sendMsg(msg);
    botAsked = false;
    streakNum = temp;
    canAsk=false;
}
;
function containsAll(iterable, txt) {
    for (var i = 0; i < iterable.length; i++)
        if (!contains(txt, iterable[i]))
            return false;
    return true;
}


/**
 * If the given question matches any question in the 'questions' array, returns its index. Otherwise returns -1.
 * @param {String} question 
 */
function questionIndex(question) {
    var txt="";

    question = question.replace("?", "").replace("do", "").toLowerCase().split(' ');
    if (question.length <= 1)
        return -1;



    for (var i = 0; i < question.length; i++)
        {
            if (question[i] == '')
                question = question.slice(0, i).concat(question.slice(i + 1, question.length));
            txt+=(i<question.length-1)?question[i]+' ':question[i];
        }

    for (var i = 0; i < questionsUser.length; i++) {
        if (containsAll(question, questionsUser[i]))
            if (Math.floor(wordNum(questionsUser[i]) / 2) <= wordNum(txt))
                return i;

    }

    return -1;
}

/**
 * Checks wheter the text contains the word
 * @param {String} txt 
 * @param {String} word 
 */
function containsWord(txt, word) {
    while (contains(txt, '?'))
        txt = txt.replace('?', '');

    txt = txt.split(' ');

    for (var i = 0; i < txt.length; i++)
        if (txt[i] == word)
            return true;
    return false;
}
/**
 * Returns the number of the words in the text
 * @param {String} txt 
 */
function wordNum(txt) {
    return txt.split(' ').length;
}

function repQAns(msg) {
    if (botQSub == "howru") {
        var pos = ["good", "fine", "well", "happy", "cool"];
        var negs = ["sad", "bad", "sorry", "unhappy", "bored"];
        var replied = true;
        if (containsItem(pos, msg) && !contains(msg, "not")) sendMsg("Glad to hear that.");
        else if (containsItem(negs, msg) && !contains(msg, "not")) sendMsg("So sad.");
        else if (containsItem(pos, msg) && contains(msg, "not")) sendMsg("So sad.");
        else if (containsItem(negs, msg) && contains(msg, "not")) sendMsg("Glad to hear that.");
        else {
            sendMsg("Sorry???");
            replied = false;
            canAsk = false;
        }
        if (replied) {
            botAsked = false;
            botQSub = "";
        }
    }

    else if (botQSub == "Where do you live?" || botQSub == "What have you taken today as breakfast?") {
        var possAns = ["Aww..", "I see.."];
        replyToQuestion(possAns[Math.floor(Math.random() * possAns.length)]);
    }

    else if (botQSub == "What is your name?") {
        var temp = msg.replace("i am ", "").replace("my name is ", "").replace("my name ", "");
        userName = temp[0].toUpperCase() + temp.slice(1, temp.length);
        var possAns = ["That means I am talking with " + userName + '.', userName + ", you seem to be a nice person!", "A nice name, " + userName + "."];
        replyToQuestion(possAns[Math.floor(Math.random() * possAns.length)]);

    }
    else if (botQSub == "Are you a man or a woman?") {
        if (containsItem(["female", "woman", "girl"], msg)) {
            replyToQuestion("You seem to be a pretty girl!");
            userMale = false;
        }
        else if (containsItem(["man", "male", "boy"], msg)) {
            replyToQuestion("I see..handsome");
            userMale = true;
        }
        else {
            sendMsg("Sorry?");
            canAsk = false;
        }
    }
    else if (botQSub == "What is your favorite programming language?") {
        if (containsItem(["java", "javascript", "python", "c", "c++", "c#", "kotlin", "ruby", "sql", "swift", "php", "go", "visual basic", "vb"], msg)) replyToQuestion("Woah that's nice");
        else replyToQuestion("lol okay, cool");
    }
    else if (botQSub == "Do you love gaming?") {
        if (containsItem(aff, msg) && !containsItem(neg, msg)) replyToQuestion("Most people love gaming.");
        else if (containsItem(neg, msg) && !containsItem(aff, msg)) replyToQuestion("Many people don't love gaming.");
        else {
            sendMsg("Sorry??");
            canAsk = false;
        }
    }
    else if (botQSub == "What's the title of the last book you read?") {
        if (containsAll(["i", "read", "book"], msg) && (containsItem(["don't", "dont", "do not", "never"], msg))) replyToQuestion("I don't know how a person can live without books.");
        else replyToQuestion("That's a great book i swear!");
    }
    else if (botQSub == "Are you married?") {
        if (containsItem(aff, msg)) replyToQuestion("That's good");
        else if (containsItem(neg, msg)) {
            sendMsg("Hey, do you have a crush on anybody?");
            canAsk = false;
            botQSub = "crush";
        }
        else {
            sendMsg("Sorry??");
            canAsk = false;
        }
    }
    else if (botQSub == "crush") {
        if (containsItem(aff, msg)) {
            sendMsg("What's " + (userMale ? "her" : "his") + " name?");
            canAsk = false;
            botQSub = "cname";
        }
        else if (containsItem(neg, msg))
            replyToQuestion("That's like a good " + (userMale ? "boy" : "girl"));
        else {
            sendMsg("Sorry??");
            canAsk = false;
        }


    }
    else if (botQSub == "cname") {
        sendMsg("Have you told " + (userMale ? "her" : "him") + "?");
        botQSub = "proposed";
        canAsk = false;
    }
    else if (botQSub == "proposed") {
        if (containsItem(aff, msg)) {
            sendMsg("That's cool." + (userMale ? "She" : "He") + " accepted?");
            botQSub = "propRep";
            canAsk = false;
        }
        else if (containsItem(neg, msg)) {
            replyToQuestion("No problem..Do it as fast as possible.");
        }
        else {
            sendMsg("Sorry?? You told " + (userMale ? "her" : "him") + " or not?");
            canAsk = false;
        }
    }
    else if (botQSub == "propRep") {
        if (contains(msg, "accept") && !containsItem(neg, msg)) {
            replyToQuestion("Coooool!!!");
        }
        else if (contains(msg, "accept") && containsItem(neg, msg)) {
            sendMsg("You mean " + (userMale ? "she" : "he") + " rejected?");
            botQSub = "propRepN";
            canAsk = false;
        }
        else if (contains(msg, "reject") && !containsItem(neg, msg)) {
            sendMsg("You mean " + (userMale ? "she" : "he") + " rejected?");
            botQSub = "propRepN";
            canAsk = false;
        }
        else if (contains(msg, "reject") && containsItem(neg, msg)) {
            sendMsg("You mean " + (userMale ? "she" : "he") + " accepted?");
            botQSub = "propRepF";
            canAsk = false;
        }
        else if (containsItem(aff, msg)) {
            sendMsg("You mean " + (userMale ? "she" : "he") + " accepted?");
            botQSub = "propRepF";
            canAsk = false;
        }
        else if (containsItem(neg, msg)) {
            sendMsg("You mean " + (userMale ? "she" : "he") + " rejected?");
            botQSub = "propRepN";
            canAsk = false;
        }
        else {
            sendMsg("Sorry?");
            canAsk = false;
        }
    }
    else if (botQSub == "propRepF") {
        if (containsItem(aff, msg)) replyToQuestion("That is great!!!!");
        else if (containsItem(neg, msg)) replyToQuestion("So sorry to hear that..");
        else {
            sendMsg("Sorry??");
            canAsk = false;
        }
    }
    else if (botQSub == "propRepN") {
        if (containsItem(aff, msg)) replyToQuestion("So sad..i am so sorry");
        else if (containsItem(neg, msg)) replyToQuestion("Coooool..");
        else {
            sendMsg("Sorry??");
            canAsk = false;
        }
    }

    else if (botQSub == "Whom do you love most?") {
        if (containsItem(["dad", "father", "mother", "mom"], msg))
            replyToQuestion("Ideal " + (userMale ? "son!" : "daughter!"));
        else if (containsItem(["brother", "sister"], msg))
            replyToQuestion("Ideal " + (userMale ? "brother!" : "sister!"));
        else if (containsItem(["myself", "me"], msg))
            replyToQuestion("You sound like you are very self-centered.")
        else if (containsItem(["girlfriend", "girl-friend", "gf", "crush", "bf", "boyfriend", "boy-friend"], msg))
            replyToQuestion("You seem to be a true lover.");
        else if (contains("friend", msg))
            replyToQuestion("You seem to be a true friend.");
        else if (containsItem(["nobody", "none", "no one"], msg))
            replyToQuestion("damm, are you hurt, are you okay?");
        else
            replyToQuestion("👀 i see..");
    }
    else if (botQSub == "How many teeth are seen when you smile?") {
        if (containsItem(["all", "32"], msg))
            replyToQuestion("Hahaha..Just like me!!!");
        else if (containsItem(["none", "zero"], msg) || containsWord(msg, "0"))
            replyToQuestion("Hahaha..");
        else if (msg.search(new RegExp("[0-9]"))!=-1) {
            sendMsg("You counted one by one??");
            botQSub = "teethcounted";
            canAsk = false;
        }
        else
            replyToQuestion("Keep smiling..!..");
    }

    else if (botQSub == "teethcounted") {
        if (containsItem(aff, msg))
            replyToQuestion("It sounds funny!");
        else if (containsItem(neg, msg))
            replyToQuestion("I knew it.!..");
    }
}