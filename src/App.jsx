import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const images = {
  algae: "/images/algae-bloom-hero.png",
  map: "/images/melbourne-runoff-map.png",
  lagoon: "/images/irl-hobe-sound-fws.jpg",
  tidal: "/images/irl-blowing-rocks-usgs.jpg",
  shore: "/images/irl-peaceful-shore-nara.jpg",
  eauGallie: "/images/irl-eau-gallie-usgs.jpg",
  drain: "/images/storm-drain-rain.png",
  curb: "/images/hero-street-drain.png",
  marker: "/images/field-marker-drain.png",
};

const lagoonPhotos = [
  {
    image: images.lagoon,
    label: "Hobe Sound refuge",
    text: "A quiet stretch of lagoon water, the kind of place this project is trying to protect.",
  },
  {
    image: images.eauGallie,
    label: "Eau Gallie reach",
    text: "This is not far away from daily life in Melbourne. Streets, canals, and shoreline all sit close together.",
  },
  {
    image: images.tidal,
    label: "Tidal flats",
    text: "Shallow water reacts quickly. Small changes upstream can show up here faster than people expect.",
  },
];

const pollutants = ["fertilizer", "pet waste", "grass clippings", "oil and dirt", "extra nutrients", "algae growth"];

const pollutantPositions = [
  { left: "8%", top: "15%", transform: "rotate(-2deg)" },
  { left: "32%", top: "10%", transform: "rotate(3deg)" },
  { left: "50%", top: "18%", transform: "rotate(-3deg)" },
  { left: "15%", top: "35%", transform: "rotate(-2deg)" },
  { left: "39%", top: "39%", transform: "rotate(2deg)" },
  { left: "53%", top: "31%", transform: "rotate(-4deg)" },
];

const trailSteps = [
  { number: "01", title: "Street", text: "Rain crosses roofs, lawns, sidewalks, and curb lines.", x: 10.42, y: 48.88 },
  { number: "02", title: "Drain", text: "The grate catches the water, not the pollution.", x: 34.36, y: 54.86 },
  { number: "03", title: "Pipe", text: "Underground pipes move the runoff out of sight.", x: 49.22, y: 56.42 },
  { number: "04", title: "Outfall", text: "The pipe releases water back near the shoreline.", x: 65.67, y: 62.82 },
  { number: "05", title: "Lagoon", text: "By then, street runoff has become lagoon water.", x: 73.9, y: 70.22 },
];

const pageLinks = [
  ["/", "Home"],
  ["/problem", "Runoff"],
  ["/storm-drains", "Route"],
  ["/mission", "Plan"],
  ["/impact", "Impact"],
  ["/team", "Team"],
  ["/resources", "Resources"],
  ["/survey", "Survey"],
];

const missionSteps = [
  {
    number: "01",
    verb: "Mark",
    title: "Mark storm drains.",
    stat: "50-75 drains",
    text: "Install approved markers on visible drains and record each location.",
    x: "5%",
    y: "18%",
  },
  {
    number: "02",
    verb: "Reach",
    title: "Reach homes.",
    stat: "300-500 households",
    text: "Use door hangers and QR surveys in the streets closest to the marked drains.",
    x: "36%",
    y: "8%",
  },
  {
    number: "03",
    verb: "Show",
    title: "Do the classroom demo.",
    stat: "4-6 demos",
    text: "Show students how clean water changes when everyday pollution gets mixed in.",
    x: "18%",
    y: "54%",
  },
  {
    number: "04",
    verb: "Log",
    title: "Keep track.",
    stat: "1 shared folder",
    text: "Save photos, survey exports, route notes, and final files in one place.",
    x: "58%",
    y: "43%",
  },
];

const fieldPanels = [
  {
    label: "Drain marking",
    image: images.marker,
    stat: "50-75",
    title: "Mark the drain.",
    text: "Each marker makes the invisible route visible at the exact spot people pass.",
  },
  {
    label: "Neighborhood wave",
    image: images.eauGallie,
    stat: "300-500",
    title: "Reach nearby homes.",
    text: "The message stays short: this drain leads to the lagoon, and your yard can affect it.",
  },
  {
    label: "Classroom ripple",
    image: images.tidal,
    stat: "4-6",
    title: "Show the demo.",
    text: "The classroom version makes the science easy to see instead of just read.",
  },
  {
    label: "App log",
    image: images.shore,
    stat: "1 project folder",
    title: "Keep it organized.",
    text: "A clean archive keeps the project useful after the presentation is over.",
  },
];

const team = [
  ["Faizan Ahmed", "Project lead", "Keeps the calendar, report, approvals, and final handoff moving."],
  ["Kairav Kumar", "Field lead", "Plans drain routes, takes route photos, and checks field records."],
  ["Sankeerth Reddy Keisreddy", "Outreach lead", "Handles door hangers, QR survey access, and neighborhood contact notes."],
  ["Prithiv Ponnusamy", "Education lead", "Builds and presents the classroom runoff demo."],
  ["Aryan Pattu", "App/data lead", "Keeps the map, photos, survey exports, and app log organized."],
];

const problemStats = [
  ["No filter", "Most street drains move water quickly. They are not treatment systems."],
  ["Yard waste", "Clippings, leaves, fertilizer, pet waste, and dirt can wash into the curb."],
  ["Cloudy water", "Extra nutrients can feed algae and block light from seagrass."],
  ["Before rain", "The useful moment is before runoff starts moving."],
];

const runoffChain = [
  ["01", "Rain starts", "Water moves across lawns, driveways, sidewalks, and roads."],
  ["02", "Runoff forms", "It picks up whatever was left loose: fertilizer, leaves, pet waste, oil, soil, and trash."],
  ["03", "Drain collects", "The drain moves runoff into the stormwater system. It does not remove the pollution first."],
  ["04", "Lagoon receives", "The route ends at canals, outfalls, and lagoon water."],
];

const missionBlueprint = [
  ["Mark", "Put approved markers on 50-75 drains and save a photo plus location for each one."],
  ["Tell", "Reach 300-500 nearby homes with door hangers, QR access, and a short explanation."],
  ["Teach", "Run classroom demos that show what clean water looks like before and after runoff enters it."],
  ["Save", "Keep photos, surveys, route notes, and final files organized for the next group."],
];

const stormDrainSpecs = [
  ["Goal", "50-75 drains", "Pick drains that people pass often, not random corners nobody sees."],
  ["Save", "Photo + GPS", "Record before and after photos, location, date, and notes."],
  ["Sticker", "No dumping", "Use a clear marker message: this drain leads to the lagoon."],
];

const fieldDatabase = [
  ["drain_id", "ID", "A simple number so every drain can be checked later."],
  ["lat / lon", "GPS", "Coordinates or map pin for the marked drain."],
  ["before_photo", "file", "What the drain looked like before the marker."],
  ["after_photo", "file", "Proof that the marker was installed."],
  ["date_marked", "date", "When the marker was placed."],
  ["nearest_street", "text", "A human-readable location for the route list."],
  ["notes", "text", "Condition, visibility, damage, or anything to revisit."],
];

const campaignTimeline = [
  ["Before", "Pick the route, confirm materials, write the survey, and prepare the classroom demo."],
  ["During", "Mark drains, take photos, deliver outreach, teach lessons, and keep the app log current."],
  ["After", "Export survey answers, clean up photo names, finish the report, and package the handoff folder."],
];

const impactEvidence = [
  ["Surveys", "Pre and post answers show whether people understood the storm-drain connection."],
  ["Marked drains", "The route map, photos, and GPS points show where reminders were placed."],
  ["Classroom work", "Demo photos, lesson notes, and student counts show what was taught."],
  ["App log", "The app or shared folder keeps maps, survey exports, and field notes in one place."],
  ["Next group", "The final archive gives the next team a route, materials, and a starting point."],
];

const surveyPlan = [
  ["Pre-survey", "Ask before outreach so there is a real starting point."],
  ["Post-survey", "Ask again after markers, door hangers, and demos have had time to work."],
  ["QR access", "Keep it fast enough to complete on a phone."],
  ["Result", "Look for a clearer understanding that storm drains lead to the lagoon."],
];

const teamResponsibilities = [
  ["Project lead", "Keeps the group on schedule and makes sure the final report matches the actual work."],
  ["Field operations", "Marks drains, checks materials, takes photos, and tracks route progress."],
  ["Outreach", "Gets door hangers and survey links to nearby homes."],
  ["Education", "Explains runoff through a hands-on classroom demo."],
  ["App & data", "Keeps the survey, map, photos, and final evidence together."],
];

const lagoonContext = [
  ["Estuary", "The Indian River Lagoon is shallow, connected, and sensitive to what enters it from land."],
  ["Neighborhoods", "Melbourne streets sit close to canals, outfalls, and lagoon shoreline."],
  ["Storm drains", "A drain can look ordinary and still be part of a direct water route."],
  ["People", "Most residents can help once they know the path exists."],
];

const runoffSources = [
  ["Fertilizer", "Nitrogen and phosphorus can wash away during rain, especially when lawns are treated before a storm."],
  ["Grass clippings", "Clippings left in the street can break down in water and add nutrients."],
  ["Pet waste", "Waste left near sidewalks and yards can move into drains during runoff."],
  ["Oil and grime", "Road residue can wash from pavement into the stormwater system."],
  ["Trash", "Small litter moves fast once water starts running along the curb."],
  ["Sediment", "Loose dirt can cloud water and carry other pollutants with it."],
];

const drainProtocol = [
  ["Scout", "Walk or drive the route and choose drains with visibility and safe access."],
  ["Prepare", "Bring markers, cleaning wipes, route sheet, phone, and photo checklist."],
  ["Clean", "Wipe the area so the marker can stick properly."],
  ["Place", "Install the marker where people can read it without stepping into traffic."],
  ["Photo", "Take a clear before and after photo from the same angle when possible."],
  ["Log", "Save the drain ID, location, date, photo names, and notes before leaving the area."],
];

const outreachDetails = [
  ["Door hanger", "A short explanation of where stormwater goes and why the drain marker matters."],
  ["QR survey", "A fast link for residents to answer what they knew before and what they know after."],
  ["Street focus", "Homes near the marked route matter most because they are closest to the runoff path."],
  ["Plain language", "No long science lecture at the door. Just the route, the risk, and one action before rain."],
];

const classroomDetails = [
  ["Clean jar", "Start with water that looks safe and easy to understand."],
  ["Runoff jar", "Add soil, grass clippings, or safe demo materials to show how fast water changes."],
  ["Student link", "Connect the jar to the storm drain outside, not just to a textbook idea."],
  ["Family ripple", "Send the message home so students can explain it to someone else."],
];

const impactMetrics = [
  ["50-75", "storm drains marked in the campaign route."],
  ["300-500", "nearby homes targeted through outreach."],
  ["4-6", "classroom sessions or demo groups."],
  ["2 waves", "pre and post survey comparison."],
  ["1 archive", "final folder with photos, route notes, survey exports, and handoff files."],
];

const archiveItems = [
  ["Project field guide", "The main PDF and final explanation of the project."],
  ["Drain marker log", "Drain IDs, GPS points, streets, dates, photos, and notes."],
  ["Outreach kit", "Door hanger copy, QR link, survey wording, and neighborhood notes."],
  ["Classroom kit", "Demo steps, materials list, student explanation, and photos."],
  ["Impact evidence", "Survey exports, summary charts, marked-drain count, and classroom count."],
  ["Handoff folder", "Everything another team would need to repeat the project without starting from zero."],
];

const surveyQuestions = [
  ["Where does street water go?", "Checks whether people understand the route from drain to lagoon."],
  ["What can wash in?", "Checks whether people connect everyday yard choices to runoff."],
  ["Have you noticed a marker?", "Checks whether the physical drain markers are being seen."],
  ["What would you change before rain?", "Looks for simple actions people would actually take."],
];

const resourceLinks = [
  ["Field guide PDF", "/clearing-the-way-field-guide.pdf", "Open the project PDF."],
  ["Storm drain route", "/storm-drains", "See how the route is logged."],
  ["Mission plan", "/mission", "Review the marking, outreach, teaching, and archive plan."],
  ["Impact record", "/impact", "See what evidence the project saves."],
  ["Survey", "/survey", "Help measure awareness."],
];

const homeNotes = [
  {
    title: "This is not a far-away water problem.",
    body: "The lagoon feels separate when you only see it from a bridge or a shoreline. The whole point of this project is to show that it is also connected to the street outside school, the grass next to a driveway, and the drain people step over without thinking. That connection is the story we are trying to make obvious.",
  },
  {
    title: "The campaign starts with noticing.",
    body: "A storm drain marker is small, but it changes the moment. Someone walking past a grate gets a reminder before the next rainstorm, not after. That is why the markers matter. They turn a piece of street infrastructure into a warning label for the lagoon.",
  },
  {
    title: "The project has to leave proof.",
    body: "A good idea is not enough for CmPS. The route, photos, survey answers, classroom demo, and final files all need to be saved clearly. If another group opens the folder later, they should be able to see what happened without guessing.",
  },
  {
    title: "The message stays simple on purpose.",
    body: "People do not need a lecture at their front door. They need to know that stormwater does not disappear, that the drain can lead to the Indian River Lagoon, and that small choices before rain can keep pollution out of the water.",
  },
  {
    title: "The website follows the project instead of selling it.",
    body: "The structure is meant to feel like walking through the work: first the lagoon, then the street, then the drain route, then the plan, then the evidence. That order matters because the project is about connection, not just awareness.",
  },
  {
    title: "The real audience is local.",
    body: "The writing should sound like it belongs to Melbourne, not a national campaign. It is about nearby streets, nearby drains, nearby homes, and a lagoon people already know. The closer the message feels, the less it sounds like a template.",
  },
  {
    title: "The final goal is continuation.",
    body: "If the project ends with one website and one report, it is weaker than it could be. The stronger version gives the next group enough material to mark more drains, run another survey wave, or teach the lesson again.",
  },
];

const problemNotes = [
  {
    title: "The drain looks like an ending, but it is really a shortcut.",
    body: "When water drops through the grate, it disappears from the street. That makes the problem easy to ignore. The route keeps going through pipes, ditches, canals, and outfalls until the water reaches connected lagoon areas. The drain is only the part people can see.",
  },
  {
    title: "Runoff is made from normal things.",
    body: "The project is not built around one dramatic spill. It is built around everyday pieces: fertilizer, leaves, grass clippings, pet waste, loose soil, oil from pavement, and trash. None of those things look huge by themselves. During rain, they can all move at once.",
  },
  {
    title: "Nutrients are useful until they are in the wrong place.",
    body: "Fertilizer is meant for lawns, not lagoon water. When nitrogen and phosphorus wash into stormwater, they can help algae grow. More algae can block light, and less light can hurt seagrass. That is the connection students and residents need to understand.",
  },
  {
    title: "The project focuses on the moment before rain.",
    body: "Once runoff is moving, it is hard to stop. Before rain, people can sweep clippings back onto the lawn, pick up pet waste, move loose trash, and avoid applying fertilizer. The campaign is timed around that practical moment.",
  },
  {
    title: "The goal is not to blame people.",
    body: "Most people are not trying to hurt the lagoon. A lot of people just do not know where the water goes. This project works better when it treats residents like partners who can make better choices once the route is visible.",
  },
  {
    title: "The problem is easy to miss on a sunny day.",
    body: "A clean street can still become a runoff path when the rain starts. That is why the project talks about timing. The same curb, lawn, and drain look harmless until water starts moving across them.",
  },
  {
    title: "The lagoon receives what the street forgets.",
    body: "Leaves left near the curb, fertilizer placed before a storm, or trash sitting by a drain can all become part of the same water path. The route makes those small choices feel connected instead of separate.",
  },
  {
    title: "A marker changes the meaning of a drain.",
    body: "Without a marker, a grate is just part of the road. With a marker, it becomes a reminder. That is why the problem page connects pollution sources to the marking plan instead of stopping at bad news.",
  },
];

const routeNotes = [
  {
    title: "The route has to make sense on foot.",
    body: "A drain route should not be random dots on a map. It should be a path someone can understand: street, grate, pipe direction, outfall, lagoon. The selected drains should sit where residents actually walk, drive, wait, or pass on the way home.",
  },
  {
    title: "Every drain needs a record.",
    body: "Each marker should have a drain ID, location, street note, before photo, after photo, date, and condition note. If the marker comes loose or the city asks for documentation, the group should be able to find that drain fast.",
  },
  {
    title: "Photos are evidence, not decoration.",
    body: "A before photo shows that the drain was found and checked. An after photo proves the marker was placed. A wide route photo helps explain the area. These pictures are part of the project record, not just images for the website.",
  },
  {
    title: "The map should show timing.",
    body: "The route animation is meant to show water moving in order. Street first, drain second, pipe third, outfall fourth, lagoon last. The user should feel the water getting farther from view but closer to the lagoon.",
  },
  {
    title: "The map is also a handoff tool.",
    body: "Future groups can use the map to revisit drains, replace missing markers, expand the route, or compare new survey results. That only works if the map is clean and tied to real field notes.",
  },
  {
    title: "The route should be checked twice.",
    body: "Before marking day, the team should check whether the drains are reachable, visible, and safe. After marking day, the team should check whether the photos and locations make sense to someone who was not there.",
  },
  {
    title: "The right drain is one people notice.",
    body: "A perfect drain on an empty road is less useful than a visible drain near homes, sidewalks, or a common turn. The campaign works better when the marker is placed in someone else's normal routine.",
  },
  {
    title: "The route should not depend on memory.",
    body: "Nobody should have to remember which drain was marked from memory. The field log should hold the route clearly enough that the map, website, and report all match the same record.",
  },
];

const missionNotes = [
  {
    title: "Marking is the visible part.",
    body: "The markers are the thing people will notice first. They should be placed neatly, photographed clearly, and installed where they can be read. The message should be direct: this drain leads to the lagoon.",
  },
  {
    title: "Outreach has to be close to the route.",
    body: "The door hangers and QR survey should go to homes near the marked drains. That gives the campaign a real boundary. The people seeing the survey are also the people most likely to pass the drains in daily life.",
  },
  {
    title: "The classroom demo gives the project a memory.",
    body: "Students remember what they can see. A clean-water jar and polluted-runoff jar make the issue physical. The lesson should connect the jar back to the storm drain outside, not leave it as a random science activity.",
  },
  {
    title: "The app or folder keeps the project honest.",
    body: "If a drain is marked, it gets logged. If a survey is collected, it gets exported. If a demo happens, the date and student count are saved. The archive keeps the project from becoming only a good story.",
  },
  {
    title: "The work should be repeatable.",
    body: "The final handoff should make it possible for another class or another CmPS group to pick one more route and keep going. That is how a school project becomes something useful outside the classroom.",
  },
  {
    title: "The four parts support each other.",
    body: "Markers catch attention on the street. Door hangers explain the message at home. Classroom demos make the science visible. The archive proves the work happened. None of the pieces is supposed to stand alone.",
  },
  {
    title: "The mission is practical before it is inspirational.",
    body: "The project should not sound like it is solving the lagoon by itself. It is doing a real, limited job: make a route visible, teach the route, measure awareness, and leave behind organized proof.",
  },
  {
    title: "The best version is easy to repeat.",
    body: "If a future group needs special knowledge to understand the plan, the handoff failed. The mission page should explain the model clearly enough that another team can copy the structure in a new neighborhood.",
  },
];

const impactNotes = [
  {
    title: "Impact is what we can prove.",
    body: "The site should not pretend the whole lagoon changes because one group marked drains. The honest impact is smaller and stronger: marked drains, reached homes, students taught, surveys collected, and a clean handoff for the next group.",
  },
  {
    title: "The survey is a before-and-after check.",
    body: "The point is not to collect random opinions. The survey asks whether people know where storm drains lead and whether they understand what can wash in. The second wave should show whether the message landed.",
  },
  {
    title: "The classroom work matters because students carry messages home.",
    body: "A student who understands runoff can explain it to a parent, a sibling, or a neighbor. That does not show up as a giant number, but it is one of the reasons the education part belongs in the project.",
  },
  {
    title: "The handoff is part of the result.",
    body: "The project is stronger if the next team can open the archive and find the route map, marker photos, survey files, outreach copy, classroom plan, and final report. That is a real outcome.",
  },
  {
    title: "The best evidence is boring in a good way.",
    body: "Dates, counts, file names, locations, and photos are not flashy, but they make the project credible. The website should make those records feel clear instead of buried.",
  },
  {
    title: "The numbers should stay honest.",
    body: "The targets are useful because they are concrete: 50-75 drains, 300-500 homes, classroom sessions, survey waves, and one archive. The site should not turn those into vague claims about saving the lagoon.",
  },
  {
    title: "Impact includes what people remember.",
    body: "If a resident notices the marker before mowing, or a student explains the demo at home, that matters. The survey and classroom records are there to catch some of that awareness instead of guessing.",
  },
  {
    title: "The final story should show the work.",
    body: "A strong final page should point back to the route, the photos, the outreach, the lessons, and the folder. It should feel like evidence gathered over time, not a single polished claim.",
  },
];

const teamNotes = [
  {
    title: "The roles are there so nothing gets lost.",
    body: "A project like this can fall apart if everyone is responsible for everything. Splitting the work into route, outreach, education, data, and report writing makes each deliverable easier to finish and easier to check.",
  },
  {
    title: "Field work needs someone watching the details.",
    body: "Drain marking is simple, but there are a lot of small mistakes that can happen: missing photos, unclear locations, bad angles, duplicate drain IDs, or notes that nobody can understand later. The field lead keeps that clean.",
  },
  {
    title: "Outreach needs a human voice.",
    body: "The door hanger should sound like a person wrote it. The message should not feel like a government poster or a copied paragraph. It should explain the route, ask for the survey, and give one thing to do before rain.",
  },
  {
    title: "Education needs to be hands-on.",
    body: "The classroom part should not be a slideshow only. The water jars, runoff materials, and student questions make the topic real. The goal is for students to leave able to explain the storm drain path in their own words.",
  },
  {
    title: "Data work is not just numbers.",
    body: "The data lead keeps the map, survey exports, photos, and folder structure from turning into a pile of files. That organization is what makes the final website, report, and handoff believable.",
  },
  {
    title: "The team should review each other's work.",
    body: "The field lead can check whether photo names match the map. The report lead can check whether the text matches the evidence. The education lead can check whether the classroom story is accurate. That cross-check keeps mistakes from becoming final.",
  },
  {
    title: "Roles can overlap, but ownership matters.",
    body: "Everyone can help mark drains or prepare materials, but each deliverable still needs one person watching it. Otherwise small tasks get delayed because everyone assumes someone else handled them.",
  },
  {
    title: "The group voice should sound local.",
    body: "The final writing should sound like students who actually walked the route and built the project. It should not sound like a generic environmental campaign pasted onto a school assignment.",
  },
];

const surveyNotes = [
  {
    title: "The survey should be short enough that people actually finish it.",
    body: "A long survey might collect more details, but fewer people will complete it. This project needs a short set of questions that checks the main idea: do people know that storm drains can connect to the lagoon?",
  },
  {
    title: "The first wave protects the baseline.",
    body: "Residents should answer before the campaign changes what they know. That gives the team a fair starting point. After markers, door hangers, and classroom outreach, the second wave can show whether awareness changed.",
  },
  {
    title: "The questions should avoid sounding like a quiz.",
    body: "People should not feel tricked or judged. The questions should be clear, normal, and easy to answer on a phone. The goal is to learn what people notice, not make them feel wrong.",
  },
  {
    title: "The results should feed the handoff.",
    body: "If survey answers show that people still miss one part of the message, the next team can fix the door hanger or classroom script. The survey becomes a tool for improving the project, not just a requirement.",
  },
  {
    title: "The survey should ask about the route.",
    body: "The most important question is whether residents understand that storm drains can lead toward the lagoon. If they miss that route, the rest of the message becomes weaker.",
  },
  {
    title: "The QR code needs a clear promise.",
    body: "People are more likely to scan if they know what they are opening. The door hanger should say the survey is short, local, and connected to the drain markers they may see nearby.",
  },
  {
    title: "The post-survey should use the same core questions.",
    body: "Changing every question after outreach makes the results harder to compare. The second wave can add one or two reflection questions, but the main awareness questions should stay consistent.",
  },
];

const resourceNotes = [
  {
    title: "The archive is the project memory.",
    body: "Without the archive, the project becomes a presentation that ends when the school year ends. With the archive, the route, photos, survey results, classroom plan, and outreach materials can be used again.",
  },
  {
    title: "The folder should be easy to open cold.",
    body: "Someone who was not in the group should be able to open the folder and understand what each file is. Clear names matter: route-map, drain-log, survey-export, outreach-copy, classroom-demo, and final-report.",
  },
  {
    title: "The PDF is only one piece.",
    body: "The field guide explains the project, but the website should also point to the living parts: route records, survey links, photos, outreach materials, and the app or shared folder that keeps field notes together.",
  },
  {
    title: "The handoff should be practical, not ceremonial.",
    body: "A useful handoff tells the next group what worked, what was unfinished, where to restart, and which files to trust. That is more valuable than a polished folder nobody can actually use.",
  },
  {
    title: "The file names should tell the truth.",
    body: "Names like final-final-map or image-0234 do not help anyone later. A clean archive uses names that say what the file is: drain-014-after, survey-wave-1-export, outreach-door-hanger, classroom-demo-plan.",
  },
  {
    title: "The archive should include unfinished work.",
    body: "A handoff is more honest when it includes what still needs attention. If some drains need a second check or a survey wave is not complete, the next team should be able to see that clearly.",
  },
  {
    title: "The website is part of the archive.",
    body: "The site should not only look good. It should organize the project for someone reading it later. That means the pages, resources, survey, and impact sections all need to point back to the same field record.",
  },
];

const projectEssays = {
  home: [
    "Clearing the Way is about making one hidden connection visible: what happens on a Melbourne street can end up in the Indian River Lagoon. A storm drain can look like the end of the story because the water disappears below the road, but it is really the start of a route. This website follows that route from the street to the lagoon so the project feels local, physical, and easy to understand.",
    "The campaign is built around practical work instead of a vague environmental message. The group plans to mark storm drains, reach nearby homes, teach students, collect survey responses, and keep a clean record of what was done. Each part is small enough to finish, but together they create a clear story that another group could repeat.",
    "The project also has to respect how people actually learn. Most residents will not stop to read a long explanation at a storm drain, and most students will remember a demonstration better than a paragraph. That is why the message is repeated in different forms: a marker on the street, a short door hanger, a classroom demo, a survey, and a final archive.",
    "The most important idea is that the lagoon was never separate from us. It is connected to lawns, curbs, rain, pipes, outfalls, classrooms, and daily habits. The website is organized to show that connection step by step, not to make the project sound bigger than it is.",
    "The final product should feel like a real field record. If someone opens this site after the project is finished, they should be able to understand the goal, follow the route, see what the team did, and know what files or records should exist in the handoff folder.",
    "The reason the project starts with the street is simple: that is where people still have time to act. Once the water is rushing into a drain, nobody is standing there filtering it by hand. Before rain, people can move clippings, pick up waste, clear trash, and think twice about what is sitting near the curb.",
    "This project is also built for a school team that has to prove what happened. That means the website cannot only be pretty. It has to explain the work in a way that matches the photos, route logs, surveys, classroom materials, and final report. The design should make the evidence easier to follow, not cover it up.",
    "The story is local on purpose. Melbourne is close enough to the lagoon that the route from neighborhood to water does not feel imaginary. The project asks people to connect places they already know: their street, a drain at the curb, the water after a storm, and the lagoon they see from bridges, parks, or shoreline roads.",
    "A good version of Clearing the Way should make someone look differently at the next storm drain they pass. That is the whole point. If the website, markers, and outreach make one ordinary drain feel connected to a living waterway, the project is doing its job.",
  ],
  problem: [
    "Stormwater is easy to misunderstand because it moves quickly and quietly. When rainwater enters a storm drain, many people assume it is being cleaned somewhere underground. In many cases, the drain is designed to move water away from streets, not to filter out fertilizer, grass clippings, pet waste, oil, trash, or sediment before that water reaches connected waterways.",
    "That matters because runoff is usually made from ordinary things. A few grass clippings in the road, fertilizer applied before a storm, loose soil near a driveway, or pet waste left on a sidewalk may not look serious by itself. During rain, those small pieces can move together along the curb and into the same drainage system.",
    "Nutrients such as nitrogen and phosphorus are especially important because they can feed algae growth when they move into water. Algae can reduce light in the water, and less light can make it harder for seagrass to survive. Seagrass is part of the lagoon food web, so a storm drain message is also a habitat message.",
    "The project does not treat residents like the problem. It treats missing information as the problem. If people do not know where the water goes, they cannot connect small choices before rain to the health of the lagoon. The campaign is designed to make that connection visible before the next storm.",
    "This page explains the problem in street-level terms because the project is not trying to scare people with abstract environmental language. It is trying to help them see the path: rain crosses the street, picks up what was left outside, enters the drain, moves through the system, and eventually reaches the lagoon.",
    "The problem is not only what enters the water. It is also how normal the route looks. A curb line, a driveway, and a drain grate do not feel like part of the lagoon when the day is dry. The project has to make that connection visible before the rain makes it obvious in the worst way.",
    "The word pollution can sound too big for a small street. That is why the project names the everyday sources directly. Fertilizer, grass, dirt, pet waste, leaves, oil, and litter are things people can actually recognize and change. The message works better when it stays close to what people already see.",
    "The Indian River Lagoon is shallow and sensitive, so what enters from land can matter. The site does not need to overstate that. It only needs to show that neighborhood runoff is one part of a larger pressure on the lagoon, and that a local group can reduce confusion around that route.",
    "The campaign is stronger when it avoids blame. Most people are not choosing to send pollution into the lagoon. Many just do not know that the storm drain is connected. The project gives them a reason to notice and a simple moment to act before rain.",
  ],
  route: [
    "The storm-drain route is the backbone of the project. It turns a general water-quality issue into a specific path that can be mapped, photographed, marked, and explained. Without the route, the campaign would only say that runoff matters. With the route, the team can show where the runoff starts and where the message needs to appear.",
    "A good route is not just a set of random drains. The drains need to be visible, safe to access, and close enough to homes or common travel paths that people will actually notice the markers. A marker on a drain that nobody passes does not teach much. A marker near a familiar sidewalk, driveway, or neighborhood street has a better chance of changing what people notice before rain.",
    "Each marked drain should become a record. The team should save a drain ID, nearby street or intersection, GPS point or map pin, before photo, after photo, date marked, and a short condition note. That record matters because it lets the group prove what happened and lets another team revisit the same drains later.",
    "The route animation on the website is meant to do the same thing the field route does in real life. It slows down the movement of water so the user can follow it. Street, drain, pipe, outfall, lagoon: those steps are simple, but they are the part most people never see.",
    "The route also gives the outreach plan a boundary. The homes closest to the marked drains are the homes most likely to recognize the drains and understand the message. That makes the route useful for field work, education, surveys, and the final handoff.",
    "The route should be readable without a team member standing beside it. A future reader should be able to open the map, see the numbered steps, match the dots to the photos, and understand why those drains were chosen. If the route only makes sense to the people who built it, the handoff is not finished.",
    "The field record should avoid vague labels. A note like near the neighborhood is not enough. A useful note gives a street, side of road, nearby landmark, drain ID, and photo name. Small details save a lot of confusion when somebody checks the route weeks later.",
    "The route also helps explain the timing of the whole campaign. First the team identifies drains. Then the markers go down. Then nearby homes get the message. Then the survey checks whether people noticed. The map is not just scenery; it is the schedule of the work.",
    "When the route is presented well, the project feels less like a school assignment and more like an investigation. The user follows water that is usually hidden, sees the places where the team acted, and understands why the lagoon is part of the same story.",
  ],
  mission: [
    "The mission has four working parts: mark, inform, educate, and save the evidence. Marking makes the route visible on the street. Informing brings the message to nearby homes. Education helps students understand what runoff can carry. Saving the evidence makes the project useful after the campaign is over.",
    "The marking work is physical and specific. The team is not just saying storm drains matter; it is placing approved reminders on actual drains and documenting each one. That turns infrastructure people ignore into a visible connection to the lagoon.",
    "The outreach work has to stay clear and short. A door hanger should not sound like a copied textbook paragraph. It should explain that the drain leads toward the lagoon, ask people to take the survey, and give one or two practical actions they can take before rain starts.",
    "The classroom work gives the project a different kind of reach. A clean-water jar and a runoff jar can show students how quickly water changes when soil, clippings, or other materials enter it. The lesson should connect the demo back to local streets so students understand that the jar represents a real path outside.",
    "The archive is the part that keeps the mission from disappearing. Photos, route notes, survey exports, classroom materials, and the final report should be stored in a way that another group can understand. A project that leaves a clean handoff has a better chance of continuing.",
    "Marking is the easiest part to see, but it is not the whole project. A drain marker without outreach might be noticed and forgotten. Outreach without the marker might feel disconnected from the street. The classroom demo without the route might feel like general science. The four parts work because they point at the same local path.",
    "The inform step should respect people's time. The door hanger and survey should be short enough to finish in a normal day, but clear enough that residents know why they are being asked. A good message says what the drain does, what can wash in, and what someone can do before rain.",
    "The educate step gives the project a human center. Students can see clean water become cloudy in a way that feels immediate. When that demo is tied back to a real storm drain outside, the science stops being abstract and starts feeling like something happening in their own neighborhood.",
    "The mission is not to sound dramatic. The mission is to do a few concrete things well and leave behind proof. That is what makes the project credible: visible markers, real outreach, a clear lesson, and organized evidence.",
  ],
  impact: [
    "The impact of this project should be measured honestly. One student campaign will not fix the entire Indian River Lagoon, and the website should not pretend that it will. The real impact is more practical: drains marked, households reached, students taught, surveys collected, and a handoff folder that makes the next step easier.",
    "The drain markers are evidence because they are visible and countable. If the project marks 50 to 75 drains, each one should have a photo and location record. Those records show that the work happened and help future teams maintain or expand the route.",
    "The outreach work is measured through homes reached and surveys completed. The survey is not just a form; it is a way to see whether people understand that storm drains can connect to the lagoon. A pre-survey and post-survey give the team a better way to talk about awareness change.",
    "The classroom work matters because students can carry the message beyond the room. A student who can explain the runoff jar can also explain why a storm drain marker matters. That kind of learning is harder to measure perfectly, but it belongs in the impact story.",
    "The final archive is also an impact result. If the next team can open the folder and find the map, photos, survey files, outreach copy, classroom plan, and final report, then the project has created something that can outlast the original group.",
    "Good impact language should be careful. It should not say that a marker saved the lagoon. It can say that the marker made a drain connection visible, that a household received the message, that a student saw the runoff demo, and that a survey answer showed what people understood.",
    "The project should count things that can be checked. Drain photos, marker counts, street lists, survey exports, attendance notes, and folder links are not exciting by themselves, but they protect the project from sounding vague. They let the group point to real work.",
    "The impact also depends on repetition. One message may not change a habit, but seeing a marker, reading a door hanger, hearing a student explain the demo, and taking a survey all reinforce the same idea. The site should show that the campaign is a set of repeated reminders, not a single announcement.",
    "The most honest result is a clearer connection. The project helps people understand that their street and the lagoon are not separate systems. That kind of awareness is small, but it is exactly what this campaign is built to create.",
  ],
  team: [
    "The team structure matters because the project has many small pieces that can easily get lost. One person needs to watch the route. One person needs to watch outreach. One person needs to build the classroom demo. One person needs to keep the data organized. One person needs to make sure the report tells the truth about the work.",
    "The project lead keeps the timeline and final story connected. That role is important because the field work, survey work, education work, and website all need to describe the same project. If the final report says one thing and the evidence folder shows another, the project becomes weaker.",
    "The field role is responsible for the physical route. That means choosing visible drains, checking safety, taking clear photos, naming files, and making sure the map matches the real route. Field work is simple in concept, but it requires careful records.",
    "The outreach and education roles make the project understandable to other people. Door hangers need to sound human, not official or robotic. Classroom lessons need to be hands-on, not just a slideshow. Those roles make the campaign feel local and real.",
    "The data role ties everything together. Survey exports, app logs, photo folders, map records, and final files have to stay organized. The data work may not be the most visible part of the project, but it is what makes the final website and handoff believable.",
    "The best team page should not feel like a list of names pasted into boxes. It should show why each role exists. A route lead prevents field details from getting lost. An outreach lead keeps the message consistent. An education lead makes the science understandable. A data lead makes the evidence usable.",
    "The team also has to sound like it actually did the work. That means responsibilities should be written in plain words: take photos, name files, mark drains, teach the demo, check the survey, update the map, and finish the report. Those details are more believable than polished titles.",
    "Prithiv Ponnusamy is listed as the education lead because the classroom piece needs someone focused on turning runoff into something students can see. That role connects the project to people who may take the message home and repeat it in their own words.",
    "A good handoff depends on every role finishing its part. If the markers are placed but the photos are missing, the evidence is weaker. If the survey is live but nobody explains it, responses drop. If the archive is messy, the next group has to restart. The team structure prevents that.",
  ],
  survey: [
    "The survey is designed to measure awareness, not to make people feel tested. The main question is simple: do residents understand that water entering a storm drain can move toward the Indian River Lagoon? If people do not understand that route, the rest of the message is harder to remember.",
    "The first survey wave should happen before the outreach has changed what people know. That gives the team a baseline. The second wave should happen after residents have seen markers, door hangers, classroom messages, or website materials. Comparing the two waves gives the team a better way to describe what changed.",
    "The survey should stay short because people are more likely to finish it on a phone. It should ask about the storm-drain path, what can wash into the drain, whether people noticed the marker, and what action they might take before rain. Those questions are enough to connect awareness to behavior.",
    "The QR code needs to feel useful, not random. The door hanger or website should explain that the survey is short and local. People should know they are helping a student project understand whether the campaign is working.",
    "The results should feed the next version of the project. If people still miss the drain-to-lagoon connection, the team can improve the marker language, door hanger, classroom script, or website section. The survey is not just a requirement; it is feedback for the campaign.",
    "The survey language should feel normal. It should not ask questions that sound like they were written for a science test. It should ask what people know, what they noticed, and what they might do before rain. That makes the answers more useful and less forced.",
    "The pre-survey and post-survey should stay close enough to compare. If the first survey asks where storm drain water goes, the second one should ask the same thing or something very similar. Otherwise the group cannot honestly say whether understanding changed.",
    "A survey response is also a clue. If many people miss the same idea, the campaign can adjust. Maybe the marker message is too small. Maybe the door hanger needs a simpler diagram. Maybe the website needs to show the route earlier. The survey helps the team fix the message instead of guessing.",
    "The survey call to action should be simple: help us understand what people know about storm drains and the lagoon. That sounds more human than asking people to participate in a campaign metric, and it gives residents a reason to help.",
  ],
  resources: [
    "The resource archive is where the project becomes useful after the presentation is over. A website can show the story, but the archive should hold the actual materials: route map, drain log, photos, outreach copy, survey exports, classroom plan, and final report.",
    "The folder should be organized for someone who was not in the group. File names should explain what the files are. A future student should not have to open every image to find the after photo for drain 14 or guess which survey file is the final export.",
    "The PDF is important, but it should not be the only record. The project needs living materials that can be reused or updated. If a marker falls off, the route log should help someone find it. If a future class wants to repeat the lesson, the classroom kit should make that easy.",
    "A good handoff also includes unfinished work. If some drains still need a second check, if the survey needs more responses, or if outreach did not cover every target street, the archive should say that clearly. Honest notes are more useful than pretending everything is complete.",
    "The resources page is meant to act like a table of contents for the project. It gives the next reader a way to find the field guide, route, mission plan, impact record, survey, and handoff materials without digging through the whole site.",
    "The archive should keep both polished materials and working records. The final report matters, but so do the messy pieces that explain how the work actually happened: draft route lists, field notes, renamed photos, survey exports, classroom timing notes, and outreach edits.",
    "A future team should be able to use the archive without asking the original group to explain everything. That means the folder structure should be boring in the best way: clear names, clear dates, clear versions, and no mystery files sitting loose at the top level.",
    "The resources page also protects the project from becoming only a visual experience. The animations and images help people understand the story, but the archive gives the work a practical life after someone closes the website.",
    "The best handoff is useful even when the next group changes the plan. If they mark a different neighborhood, update the survey, or add more classroom demos, they should still be able to reuse the structure from this project.",
  ],
};

function Cursor() {
  return (
    <div className="cursor-dot" aria-hidden="true">
      <span className="cursor-ring" />
    </div>
  );
}

function OceanFluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const gl = canvas?.getContext("webgl", { alpha: true, antialias: false, depth: false, stencil: false });
    if (!canvas || !gl || reduced) return undefined;

    const vertexSource = `
      attribute vec2 aPosition;
      varying vec2 vUv;
      void main() {
        vUv = aPosition * 0.5 + 0.5;
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;
      uniform vec2 uResolution;
      uniform vec2 uPointer;
      uniform float uTime;
      uniform float uPointerActive;
      uniform float uScroll;
      varying vec2 vUv;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
          mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float value = 0.0;
        float amp = 0.5;
        for (int i = 0; i < 4; i++) {
          value += amp * noise(p);
          p = p * 2.02 + vec2(17.4, 9.2);
          amp *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = vUv;
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        float t = uTime * 0.22;
        float scroll = uScroll * 0.0012;

        vec2 drift = vec2(
          fbm(uv * 2.15 + vec2(t * 0.62 + scroll, -t * 0.24)),
          fbm(uv * 2.55 + vec2(-t * 0.28, t * 0.5 + scroll * 0.8))
        ) - 0.5;

        vec2 flowUv = uv + drift * 0.18;
        float broad = fbm(flowUv * 1.65 + vec2(t * 0.9, -t * 0.56 + scroll));
        float fine = fbm(flowUv * 6.8 + vec2(-t * 1.5, t * 1.14));
        float vein = sin((flowUv.x * 6.2 + flowUv.y * 13.5) + broad * 4.4 + t * 5.4);
        float silk = sin((flowUv.y + broad * 0.3) * 31.0 + t * 7.2 + sin(flowUv.x * 11.0) * 0.6);
        float surface = smoothstep(0.16, 0.9, broad * 0.58 + fine * 0.28 + silk * 0.1);

        vec2 pointer = vec2(uPointer.x, 1.0 - uPointer.y);
        vec2 mp = vec2((uv.x - pointer.x) * aspect, uv.y - pointer.y);
        float d = length(mp);
        float wake = sin(d * 74.0 - uTime * 8.4) * exp(-d * 10.0) * uPointerActive;
        float splat = smoothstep(0.28, 0.0, d) * uPointerActive;
        float current = smoothstep(0.18, 0.92, surface + vein * 0.08 + max(wake, 0.0) * 0.35);

        vec3 abyss = vec3(0.005, 0.04, 0.075);
        vec3 ocean = vec3(0.02, 0.22, 0.34);
        vec3 cyan = vec3(0.05, 0.62, 0.68);
        vec3 foam = vec3(0.78, 0.94, 0.9);
        vec3 algae = vec3(0.42, 0.65, 0.38);
        vec3 color = mix(abyss, ocean, broad);
        color = mix(color, cyan, current * 0.58);
        color = mix(color, algae, max(0.0, vein) * 0.055);
        color += foam * max(wake, 0.0) * 0.42;
        color += cyan * splat * 0.24;

        float edgeVignette = smoothstep(0.95, 0.26, distance(uv, vec2(0.5)));
        float alpha = 0.46 + current * 0.25 + max(wake, 0.0) * 0.28 + splat * 0.14;
        alpha *= 0.72 + edgeVignette * 0.28;
        gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.86));
      }
    `;

    const compile = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) return undefined;

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return undefined;

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const position = gl.getAttribLocation(program, "aPosition");
    const resolution = gl.getUniformLocation(program, "uResolution");
    const pointerUniform = gl.getUniformLocation(program, "uPointer");
    const timeUniform = gl.getUniformLocation(program, "uTime");
    const pointerActiveUniform = gl.getUniformLocation(program, "uPointerActive");
    const scrollUniform = gl.getUniformLocation(program, "uScroll");

    const pointer = { x: 0.5, y: 0.5, active: 0 };
    let frame = 0;
    let lastPaint = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.2);
      canvas.width = Math.max(1, Math.floor(window.innerWidth * dpr * 0.58));
      canvas.height = Math.max(1, Math.floor(window.innerHeight * dpr * 0.58));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const move = (event) => {
      pointer.x = event.clientX / Math.max(window.innerWidth, 1);
      pointer.y = event.clientY / Math.max(window.innerHeight, 1);
      pointer.active = 1;
    };

    const leave = () => {
      pointer.active = 0;
    };

    const render = (now) => {
      if (now - lastPaint < 32) {
        frame = window.requestAnimationFrame(render);
        return;
      }
      lastPaint = now;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(pointerUniform, pointer.x, pointer.y);
      gl.uniform1f(timeUniform, now * 0.001);
      gl.uniform1f(pointerActiveUniform, pointer.active);
      gl.uniform1f(scrollUniform, window.scrollY || 0);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      frame = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    frame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  return (
    <div className="ocean-fluid" aria-hidden="true">
      <div className="ocean-fluid-photo" />
      <canvas className="fluid-background" ref={canvasRef} />
      <div className="ocean-fluid-shade" />
    </div>
  );
}

function PavelFluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const lowPower = (navigator.hardwareConcurrency || 4) < 4;
    if (!canvas || reduced || !finePointer || window.innerWidth < 900 || lowPower) {
      document.documentElement.classList.add("fluid-static");
      return () => document.documentElement.classList.remove("fluid-static");
    }

    window.ga = window.ga || (() => {});

    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const existing = document.querySelector(`script[src="${src}"]`);
        if (existing) {
          existing.addEventListener("load", resolve, { once: true });
          resolve();
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.async = false;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    let cancelled = false;
    const startFluid = () => {
      loadScript("/fluid/dat.gui.min.js")
        .then(() => {
          if (cancelled || window.__pavelFluidLoaded) return undefined;
          window.__pavelFluidLoaded = true;
          return loadScript("/fluid/script.js");
        })
        .catch(() => {});
    };
    const idleId = "requestIdleCallback" in window
      ? window.requestIdleCallback(startFluid, { timeout: 1200 })
      : window.setTimeout(startFluid, 500);

    const forward = (type, event) => {
      if (!canvas) return;
      canvas.dispatchEvent(new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        clientX: event.clientX,
        clientY: event.clientY,
        screenX: event.screenX,
        screenY: event.screenY,
      }));
    };

    let dragging = false;
    let queuedMove = null;
    let moveFrame = 0;

    const down = (event) => {
      dragging = true;
      document.documentElement.classList.add("fluid-dragging");
      window.getSelection()?.removeAllRanges();
      forward("mousedown", event);
    };
    const move = (event) => {
      if (!dragging) return;
      event.preventDefault();
      window.getSelection()?.removeAllRanges();
      queuedMove = event;
      if (moveFrame) return;
      moveFrame = window.requestAnimationFrame(() => {
        moveFrame = 0;
        if (queuedMove) forward("mousemove", queuedMove);
      });
    };
    const up = () => {
      dragging = false;
      queuedMove = null;
      document.documentElement.classList.remove("fluid-dragging");
      window.getSelection()?.removeAllRanges();
      window.dispatchEvent(new MouseEvent("mouseup"));
    };

    window.addEventListener("pointerdown", down, { passive: true });
    window.addEventListener("pointermove", move, { passive: false });
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);

    return () => {
      cancelled = true;
      if ("cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
      if (moveFrame) window.cancelAnimationFrame(moveFrame);
      document.documentElement.classList.remove("fluid-dragging");
      document.documentElement.classList.remove("fluid-static");
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
    };
  }, []);

  return (
    <div className="pavel-fluid" aria-hidden="true">
      <div className="lagoon-photo-reel">
        <span style={{ "--bg": `url("${images.lagoon}")` }} />
        <span style={{ "--bg": `url("${images.eauGallie}")` }} />
        <span style={{ "--bg": `url("${images.tidal}")` }} />
        <span style={{ "--bg": `url("${images.shore}")` }} />
      </div>
      <canvas ref={canvasRef} className="pavel-fluid-canvas" />
      <div className="promo">
        <span className="promo-close">x</span>
        <span id="apple_link">Apple</span>
        <span id="google_link">Google</span>
      </div>
    </div>
  );
}

function TopNavigation({ path }) {
  return (
    <header className="top-nav">
      <nav className="top-nav-inner" aria-label="Primary navigation">
        <a className="brand-lockup" href="/">
          <span>Brevard Co.</span>
          <strong>Clearing the Way</strong>
        </a>
        <div className="top-nav-links">
          {pageLinks.map(([href, label]) => (
            <a className={path === href ? "active" : ""} href={href} key={href}>
              {label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

function useMotion() {
  const root = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compact = window.matchMedia("(max-width: 760px)").matches;
    let cleanupCursor = () => {};
    let cleanupHash = () => {};
    let cleanupFieldNotes = () => {};
    let cleanupRouteProgress = () => {};

    const scrollToHash = () => {
      if (!window.location.hash) return;
      const target = document.querySelector(window.location.hash);
      if (!target) return;
      window.setTimeout(() => {
        ScrollTrigger.refresh();
        target.scrollIntoView({ block: "start", behavior: reduced ? "auto" : "smooth" });
      }, 120);
    };

    window.addEventListener("hashchange", scrollToHash);
    cleanupHash = () => window.removeEventListener("hashchange", scrollToHash);
    window.setTimeout(scrollToHash, 320);

    if (reduced) return cleanupHash;

    const ctx = gsap.context(() => {
      const immersive = !compact;
      const cursor = document.querySelector(".cursor-dot");
      if (cursor && window.matchMedia("(pointer: fine)").matches) {
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.22, ease: "power3.out" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.22, ease: "power3.out" });
        const move = (event) => {
          xTo(event.clientX);
          yTo(event.clientY);
        };
        window.addEventListener("pointermove", move);
        cleanupCursor = () => window.removeEventListener("pointermove", move);
      }

      const prepPath = (selector) => {
        const path = document.querySelector(selector);
        if (!path) return null;
        const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 100;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        return path;
      };

      prepPath(".route-path");
      prepPath(".mission-path");

      if (!compact) {
        prepPath(".runoff-curve");
        prepPath(".curb-route");
      }

      const setupRouteProgress = () => {
        const trail = document.querySelector(".trail");
        const path = document.querySelector(".route-path");
        const runner = document.querySelector(".route-runner");
        const pins = gsap.utils.toArray(".trail-pin");
        if (!trail || !path) return false;

        const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 100;
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        let frame = 0;
        let loop = 0;

        const update = () => {
          frame = 0;
          const rect = trail.getBoundingClientRect();
          const travel = Math.max(rect.height - window.innerHeight, 1);
          const progress = Math.min(1, Math.max(0, -rect.top / travel));
          path.style.strokeDashoffset = String(length * (1 - progress));

          if (runner) {
            const point = typeof path.getPointAtLength === "function"
              ? path.getPointAtLength(length * progress)
              : (() => {
                  const routePoints = trailSteps.map((step) => ({ x: step.x, y: step.y }));
                  const scaled = progress * (routePoints.length - 1);
                  const index = Math.min(routePoints.length - 2, Math.max(0, Math.floor(scaled)));
                  const local = scaled - index;
                  const a = routePoints[index];
                  const b = routePoints[index + 1];
                  return {
                    x: a.x + (b.x - a.x) * local,
                    y: a.y + (b.y - a.y) * local,
                  };
                })();
            runner.style.left = `${point.x}%`;
            runner.style.top = `${point.y}%`;
            runner.style.opacity = progress > 0.02 && progress < 0.98 ? "1" : "0";
            runner.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.32})`;
          }

          pins.forEach((pin, index) => {
            const threshold = pins.length <= 1 ? 0 : index / (pins.length - 1);
            const active = progress >= threshold - 0.045;
            pin.style.opacity = active ? "1" : "0.18";
            pin.style.transform = active ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.74)";
          });
        };

        const requestUpdate = () => {
          if (frame) return;
          frame = window.requestAnimationFrame(update);
        };

        update();
        const tick = () => {
          update();
          loop = window.requestAnimationFrame(tick);
        };
        loop = window.requestAnimationFrame(tick);
        window.__routeSetup = { pins: pins.length, length };
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        cleanupRouteProgress = () => {
          if (frame) window.cancelAnimationFrame(frame);
          if (loop) window.cancelAnimationFrame(loop);
          window.removeEventListener("scroll", requestUpdate);
          window.removeEventListener("resize", requestUpdate);
        };
        return true;
      };

      let routeAttempts = 0;
      const tryRouteSetup = () => {
        routeAttempts += 1;
        if (setupRouteProgress() || routeAttempts > 20) return;
        window.setTimeout(tryRouteSetup, 120);
      };
      window.setTimeout(tryRouteSetup, 120);

      if (document.querySelector(".hero")) {
        gsap.from(".hero-word, .hero-lede, .hero-actions", {
          y: 42,
          stagger: 0.09,
          duration: 0.9,
          ease: "power3.out",
        });

        if (!compact) {
          gsap.to(".hero-media img", {
            scale: 1.12,
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
          });
        }
      }

      if (immersive && !compact && document.querySelector(".problem")) {
        const problemTl = gsap.timeline({
          scrollTrigger: { trigger: ".problem", start: "top top", end: "+=220%", scrub: true, pin: ".problem-frame" },
        });

        problemTl
          .fromTo(".problem-photo", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 0.75 }, 0)
          .fromTo(".problem-photo img", { scale: 1.04, xPercent: -2, yPercent: -2 }, { scale: 1.16, xPercent: 4, yPercent: 3, duration: 1.8, ease: "none" }, 0)
          .fromTo(".storm-scan", { xPercent: -125, autoAlpha: 0 }, { xPercent: 125, autoAlpha: 0.72, duration: 1.15, ease: "none" }, 0.08)
          .fromTo(".street-slice", { xPercent: -120, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, stagger: 0.08, duration: 0.6 }, 0.08)
          .fromTo(".rain-streak", { y: -130, autoAlpha: 0 }, { y: 140, autoAlpha: 0.52, stagger: 0.025, duration: 0.95 }, 0.08)
          .to(".curb-route", { strokeDashoffset: 0, duration: 1.05, ease: "none" }, 0.24)
          .fromTo(".runoff-item", { y: -42, autoAlpha: 0, rotate: -2 }, { y: 0, autoAlpha: 1, rotate: 0, stagger: 0.08, duration: 0.55 }, 0.22)
          .fromTo(".flow-drop", { autoAlpha: 0, scale: 0.35 }, { autoAlpha: 1, scale: 1, stagger: 0.05, duration: 0.18 }, 0.44)
          .to(".flow-drop", {
            motionPath: { path: ".curb-route", align: ".curb-route", alignOrigin: [0.5, 0.5] },
            stagger: 0.07,
            duration: 1.25,
            ease: "none",
          }, 0.54)
          .to(".runoff-item", { x: 230, y: 230, scale: 0.55, rotate: 9, autoAlpha: 0.72, stagger: 0.07, duration: 0.9 }, 0.66)
          .fromTo(".drain-mouth", { scale: 0.7, rotate: -8, autoAlpha: 0.72 }, { scale: 1.1, rotate: 0, autoAlpha: 1, duration: 0.6 }, 0.8)
          .to(".flow-drop", { autoAlpha: 0, scale: 0.25, stagger: 0.04, duration: 0.35 }, 1.42)
          .fromTo(".lagoon-plume", { scale: 0.15, autoAlpha: 0 }, { scale: 1, autoAlpha: 0.86, duration: 0.9 }, 1.28)
          .fromTo(".bloom-warning", { autoAlpha: 0, y: 34 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.48);
      }

      if (false && immersive && !compact && document.querySelector(".trail")) {
        const trailTl = gsap.timeline({
          scrollTrigger: { trigger: ".trail", start: "top top", end: "+=410%", scrub: true, pin: ".trail-stage" },
        });
        const trailPins = gsap.utils.toArray(".trail-pin");
        const trailCards = gsap.utils.toArray(".trail-card");
        const trailStepTimes = [0.15, 0.88, 1.55, 2.34, 3.02];

        trailTl
          .set(".route-runner", { autoAlpha: 0, scale: 0.5 }, 0)
          .set(trailPins, { autoAlpha: 0, scale: 0.78 }, 0)
          .set(trailCards, { autoAlpha: 0, y: 34 }, 0)
          .to(".route-path", { strokeDashoffset: 0, duration: 3.34, ease: "none" }, 0)
          .to(".route-runner", { autoAlpha: 1, scale: 1, duration: 0.12 }, 0.08)
          .to(".route-runner", {
            motionPath: { path: ".route-path", align: ".route-path", alignOrigin: [0.5, 0.5] },
            duration: 3.34,
            ease: "none",
          }, 0.02)
          .to(".route-runner", { scale: 1.45, autoAlpha: 0, duration: 0.22 }, 3.18);

        trailCards.forEach((card, index) => {
          const start = trailStepTimes[index];
          if (index > 0) {
            trailTl.to(trailCards[index - 1], { autoAlpha: 0, y: -18, duration: 0.18 }, start - 0.1);
            trailTl.to(trailPins[index - 1], { scale: 0.88, opacity: 0.76, duration: 0.18 }, start - 0.08);
          }

          trailTl
            .to(trailPins[index], { autoAlpha: 1, scale: 1.08, opacity: 1, duration: 0.22, ease: "power2.out" }, start)
            .to(trailPins[index], { scale: 1, duration: 0.22, ease: "power2.out" }, start + 0.22)
            .to(card, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" }, start + 0.03);
        });
      }

      if (immersive && !compact && document.querySelector(".mission")) {
        const missionTl = gsap.timeline({
          scrollTrigger: { trigger: ".mission", start: "top top", end: "+=300%", scrub: true, pin: ".mission-stage" },
        });

        missionTl
          .from(".mission-copy", { y: 58, duration: 0.55 }, 0)
          .to(".mission-path", { strokeDashoffset: 0, duration: 1.55, ease: "none" }, 0.12)
          .fromTo(".mission-scanline", { xPercent: -130, autoAlpha: 0 }, { xPercent: 130, autoAlpha: 0.8, duration: 1.4, ease: "none" }, 0.1)
          .fromTo(".mission-card", {
            y: 190,
            x: (index) => (index % 2 ? 120 : -120),
            rotate: (index) => (index % 2 ? 10 : -10),
            scale: 0.82,
            autoAlpha: 0,
          }, {
            y: 0,
            x: 0,
            rotate: 0,
            scale: 1,
            autoAlpha: 1,
            stagger: 0.16,
            duration: 0.8,
            ease: "power3.out",
          }, 0.28)
          .fromTo(".mission-object", { y: 90, autoAlpha: 0, rotate: -12 }, {
            y: 0,
            autoAlpha: 1,
            rotate: 0,
            stagger: 0.1,
            duration: 0.65,
          }, 0.72)
          .to(".mission-count", { innerText: 4, snap: { innerText: 1 }, duration: 1.1 }, 0.48)
          .to(".mission-card", { y: (index) => (index % 2 ? -18 : 18), stagger: 0.1, duration: 0.7 }, 1.35);
      }

      const track = document.querySelector(".impact-track");
      if (immersive && track && window.innerWidth > 900) {
        const impactScroll = {
          trigger: ".impact",
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          scrub: true,
          pin: true,
          invalidateOnRefresh: true,
        };
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth + 72),
          ease: "none",
          scrollTrigger: impactScroll,
        });
        gsap.fromTo(".impact-progress span", { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".impact",
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.fromTo(el, { y: 56, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        });
      });

      gsap.utils.toArray(".page-hero").forEach((section) => {
        gsap.fromTo(section.querySelectorAll(".eyebrow, h1, p, .page-actions"), {
          y: 38,
        }, {
          y: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 82%" },
        });
      });

      gsap.utils.toArray(".stat-card, .story-card, .overview-card").forEach((card) => {
        gsap.fromTo(card, {
          y: 34,
          autoAlpha: 0,
        }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.58,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });

      gsap.utils.toArray(".chain-row, .timeline-row, .evidence-row, .data-row, .essay-block").forEach((row) => {
        gsap.fromTo(row, {
          x: -42,
          autoAlpha: 0,
          "--row-line": "0%",
        }, {
          x: 0,
          autoAlpha: 1,
          "--row-line": "100%",
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 86%" },
        });
      });

      const fieldNotes = gsap.utils.toArray(".field-note");
      const revealFieldNotes = () => {
        fieldNotes.forEach((note) => {
          if (note.getBoundingClientRect().top < window.innerHeight * 0.9) {
            note.classList.add("is-visible");
          }
        });
      };
      revealFieldNotes();
      window.addEventListener("scroll", revealFieldNotes, { passive: true });
      window.addEventListener("resize", revealFieldNotes);
      cleanupFieldNotes = () => {
        window.removeEventListener("scroll", revealFieldNotes);
        window.removeEventListener("resize", revealFieldNotes);
      };

      fieldNotes.forEach((note, index) => {
        if (!compact) {
          gsap.to(note.querySelector("h3"), {
            y: index % 2 ? -18 : 18,
            ease: "none",
            scrollTrigger: { trigger: note, start: "top bottom", end: "bottom top", scrub: true },
          });
        }
      });

      gsap.utils.toArray(".photo-panel").forEach((panel, index) => {
        gsap.fromTo(panel, {
          y: 36,
          autoAlpha: 0,
        }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 82%" },
        });
      });

      if (document.querySelector(".impact")) {
        gsap.fromTo(".impact-panel", { y: 34, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.1,
          duration: 0.58,
          scrollTrigger: { trigger: ".impact", start: "top 72%" },
        });
      }

      if (false && !immersive && document.querySelector(".trail-map")) {
        gsap.to(".route-path", {
          strokeDashoffset: 0,
          duration: compact ? 1.1 : 1.35,
          ease: "power2.out",
          scrollTrigger: { trigger: ".trail-map", start: "top 72%" },
        });

        if (!compact) {
          gsap.fromTo(".route-runner", { autoAlpha: 0, scale: 0.65 }, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.15,
            scrollTrigger: { trigger: ".trail-map", start: "top 72%" },
          });
          gsap.to(".route-runner", {
            motionPath: { path: ".route-path", align: ".route-path", alignOrigin: [0.5, 0.5] },
            duration: 1.35,
            ease: "power2.inOut",
            scrollTrigger: { trigger: ".trail-map", start: "top 72%" },
          });
          gsap.to(".route-runner", {
            autoAlpha: 0,
            scale: 1.25,
            duration: 0.25,
            delay: 1.15,
            scrollTrigger: { trigger: ".trail-map", start: "top 72%" },
          });
        }

        gsap.fromTo(".trail-pin", { autoAlpha: 0, scale: 0.5 }, {
          autoAlpha: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.45,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ".trail-map", start: "top 70%" },
        });
      }

      if (compact) {
        [
          [".trail-card", ".trail"],
          [".mission-card", ".mission"],
        ].forEach(([items, trigger]) => {
          if (!document.querySelector(trigger)) return;
          gsap.fromTo(items, {
            y: 36,
            autoAlpha: 0,
          }, {
            y: 0,
            autoAlpha: 1,
            stagger: 0.07,
            duration: 0.58,
            ease: "power3.out",
            scrollTrigger: { trigger, start: "top 82%" },
          });
        });
      }

      if (document.querySelector(".dossiers")) {
        gsap.fromTo(".dossier-card", { y: 34, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.58,
          ease: "power3.out",
          scrollTrigger: { trigger: ".dossiers", start: "top 70%" },
        });
      }

      if (document.querySelector(".final img")) {
        gsap.to(".final img", {
          scale: 1.12,
          ease: "none",
          scrollTrigger: { trigger: ".final", start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      window.setTimeout(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.update();
        window.__ctwTriggerCount = ScrollTrigger.getAll().length;
      }, 250);
    }, root);

    return () => {
      cleanupCursor();
      cleanupHash();
      cleanupFieldNotes();
      cleanupRouteProgress();
      ctx.revert();
    };
  }, []);

  return root;
}

function useRouteProgress(path) {
  useEffect(() => {
    if (path !== "/storm-drains") return undefined;

    let frame = 0;
    let retry = 0;
    let cancel = false;

    const start = () => {
      if (cancel) return;
      const trail = document.querySelector(".trail");
      const routePath = document.querySelector(".route-path");
      const runner = document.querySelector(".route-runner");
      const pins = [...document.querySelectorAll(".trail-pin")];

      if (!trail || !routePath || pins.length === 0) {
        retry += 1;
        if (retry < 30) window.setTimeout(start, 100);
        return;
      }

      const length = typeof routePath.getTotalLength === "function" ? routePath.getTotalLength() : 100;
      routePath.style.strokeDasharray = String(length);
      window.__routeSetup = { pins: pins.length, length, source: "standalone" };

      const update = () => {
        if (cancel) return;
        const rect = trail.getBoundingClientRect();
        const travel = Math.max(rect.height - window.innerHeight, 1);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        routePath.style.strokeDashoffset = String(length * (1 - progress));

        if (runner) {
          const scaled = progress * (trailSteps.length - 1);
          const index = Math.min(trailSteps.length - 2, Math.max(0, Math.floor(scaled)));
          const local = scaled - index;
          const a = trailSteps[index];
          const b = trailSteps[index + 1];
          const x = a.x + (b.x - a.x) * local;
          const y = a.y + (b.y - a.y) * local;
          runner.style.left = `${x}%`;
          runner.style.top = `${y}%`;
          runner.style.opacity = progress > 0.02 && progress < 0.98 ? "1" : "0";
          runner.style.transform = `translate(-50%, -50%) scale(${1 + progress * 0.32})`;
        }

        pins.forEach((pin, index) => {
          const threshold = pins.length <= 1 ? 0 : index / (pins.length - 1);
          const active = progress >= threshold - 0.045;
          pin.style.opacity = active ? "1" : "0.18";
          pin.style.transform = active ? "translate(-50%, -50%) scale(1)" : "translate(-50%, -50%) scale(0.74)";
        });
      };

      const tick = () => {
        update();
        frame = window.requestAnimationFrame(tick);
      };

      tick();
    };

    const startId = window.setTimeout(start, 100);

    return () => {
      cancel = true;
      window.clearTimeout(startId);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [path]);
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-media" aria-hidden="true">
        <img src={images.lagoon} alt="" />
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-copy">
        <h1>
          <span className="hero-word">This water</span>
          <span className="hero-word">is ours.</span>
        </h1>
        <p className="hero-lede">Most people walk past storm drains without thinking about where they go. This project slows that down.</p>
        <div className="hero-actions">
          <a className="button light" href="/storm-drains">Start the trail</a>
          <a className="button quiet light" href="/survey">Help out</a>
        </div>
      </div>
      <div className="hero-facts" aria-label="Problem summary">
        <span>No filter</span>
        <span>No treatment</span>
        <span>Direct to water</span>
      </div>
    </section>
  );
}

function PageHeader({ kicker, title, text, actions = [] }) {
  return (
    <section className="page-hero">
      <div>
        <p className="eyebrow">{kicker}</p>
        <h1>{title}</h1>
        <p>{text}</p>
        {actions.length > 0 ? (
          <div className="page-actions">
            {actions.map(([label, href], index) => (
              <a className={`button light ${index > 0 ? "quiet" : ""}`} href={href} key={href}>
                {label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function OverviewGrid() {
  const cards = [
    ["/problem", "Runoff", "What rain carries with it."],
    ["/storm-drains", "Route", "Where the drain leads."],
    ["/mission", "Plan", "What we are doing."],
    ["/impact", "Impact", "What we can show."],
    ["/team", "Team", "Who is doing the work."],
    ["/resources", "Resources", "Files and handoff notes."],
    ["/survey", "Survey", "Help us out."],
  ];

  return (
    <section className="overview-grid" aria-label="Website pages">
      {cards.map(([href, title, text], index) => (
        <a className="overview-card" href={href} key={href}>
          <span>0{index + 1}</span>
          <h2>{title}</h2>
          <p>{text}</p>
        </a>
      ))}
    </section>
  );
}

function LagoonPhotoEssay() {
  return (
    <section className="photo-essay" aria-label="Indian River Lagoon photo record">
      <div className="photo-essay-head" data-reveal>
        <p className="eyebrow">Lagoon record</p>
        <h2>The lagoon is close.</h2>
      </div>
      <div className="photo-panels">
        {lagoonPhotos.map((photo, index) => (
          <figure className="photo-panel" key={photo.label}>
            <img src={photo.image} alt={photo.text} />
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")} / {photo.label}</span>
              <p>{photo.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function ContentBand({ kicker, title, text, children, dark = false }) {
  return (
    <section className={`content-band ${dark ? "dark" : "light"}`}>
      <div className="content-shell">
        <div className="content-heading">
          <p className="eyebrow">{kicker}</p>
          <h2>{title}</h2>
          {text ? <p>{text}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

function StatGrid({ items }) {
  return (
    <div className="stat-grid">
      {items.map(([value, label]) => (
        <article className="stat-card" key={value}>
          <strong>{value}</strong>
          <p>{label}</p>
        </article>
      ))}
    </div>
  );
}

function ChainList({ items }) {
  return (
    <div className="chain-list">
      {items.map(([number, title, text]) => (
        <article className="chain-row" key={number}>
          <span>{number}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function StoryCards({ items }) {
  return (
    <div className="story-cards">
      {items.map(([title, text], index) => (
        <article className="story-card" key={title} style={{ "--i": index }}>
          <span>0{index + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function DataTable({ rows }) {
  return (
    <div className="data-table">
      {rows.map(([field, type, desc]) => (
        <div className="data-row" key={field}>
          <code>{field}</code>
          <span>{type}</span>
          <p>{desc}</p>
        </div>
      ))}
    </div>
  );
}

function TimelineRows({ items }) {
  return (
    <div className="timeline-rows">
      {items.map(([phase, text], index) => (
        <article className="timeline-row" key={phase}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{phase}</h3>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function EvidenceRows({ items }) {
  return (
    <div className="evidence-rows">
      {items.map(([title, text], index) => (
        <article className="evidence-row" key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function ResourceRows({ items }) {
  return (
    <div className="evidence-rows">
      {items.map(([title, href, text], index) => (
        <a className="evidence-row" href={href} key={title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </a>
      ))}
    </div>
  );
}

function FieldNotes({ items }) {
  return (
    <div className="field-notes">
      {items.map((item, index) => (
        <article className="field-note" key={item.title} style={{ "--i": index }}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{item.title}</h3>
          <p>{item.body}</p>
        </article>
      ))}
    </div>
  );
}

function ProjectEssay({ items }) {
  return (
    <div className="project-essay">
      {items.map((text, index) => (
        <article className="essay-block" key={text.slice(0, 48)}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{text}</p>
        </article>
      ))}
    </div>
  );
}

function ProblemScene() {
  return (
    <section className="problem" id="problem">
      <div className="problem-frame">
        <div className="problem-copy">
          <h2>Rain does not leave empty-handed.</h2>
          <p>It can pick up grass clippings, fertilizer, oil, and pet waste before anyone thinks about it.</p>
        </div>
        <div className="runoff-field runoff-field-v2" aria-hidden="true">
          <figure className="problem-photo">
            <img src={images.drain} alt="" />
          </figure>
          <span className="storm-scan" />
          <div className="street-slices">
            <span className="street-slice" />
            <span className="street-slice" />
            <span className="street-slice" />
          </div>
          <div className="rain-sheet">
            {Array.from({ length: 22 }).map((_, index) => (
              <span className="rain-streak" key={index} style={{ "--i": index }} />
            ))}
          </div>
          <div className="curb-edge" />
          <svg className="runoff-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="runoff-curve" d="M8 21 C19 30 31 35 42 47 C55 61 66 72 83 79" />
            <path className="curb-route" d="M8 28 C21 35 31 46 44 55 C58 65 74 72 91 80" />
          </svg>
          {Array.from({ length: 9 }).map((_, index) => (
            <span className="flow-drop" key={index} />
          ))}
          {pollutants.map((item, index) => (
            <span className="runoff-item" key={item} style={{ "--i": index, ...pollutantPositions[index] }}>
              {item}
            </span>
          ))}
          <div className="drain-mouth">
            <b>storm drain</b>
            <i />
            <i />
            <i />
          </div>
          <div className="lagoon-plume" />
        </div>
        <div className="bloom-warning">
          <strong>Algae blooms</strong>
          <span>Too much fertilizer can help algae grow.</span>
        </div>
      </div>
    </section>
  );
}

function Trail() {
  return (
    <section className="trail" id="trail">
      <div className="trail-stage">
        <div className="trail-map">
          <img src={images.map} alt="Map route from a Melbourne neighborhood to the Indian River Lagoon." />
          <svg className="route-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="route-path" d="M10.42 48.88 C11.58 47.56 12.42 47.42 12.82 47.92 C13.36 48.72 13.05 51.08 13.42 52.82 C14.04 55.12 16.35 53.92 18.2 53 C20.68 51.78 23.38 50.9 25.9 52.02 C28.55 53.15 31.2 54.72 34.36 54.86 C38.8 54.64 43.45 54.2 49.22 56.42 C54.82 57.86 60.26 60.84 65.67 62.82 C68.62 63.92 68.58 65.82 70.72 66.98 C72.12 67.78 72.88 69.38 73.9 70.22" />
          </svg>
          <span className="route-runner" />
          {trailSteps.map((step) => (
            <span className="trail-pin" key={step.number} style={{ left: `${step.x}%`, top: `${step.y}%` }}>
              {step.number}
            </span>
          ))}
        </div>
        <div className="trail-copy">
          <h2>Street to lagoon.</h2>
          <div className="trail-cards">
            {trailSteps.map((step) => (
              <article className="trail-card" key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionSequence() {
  return (
    <section className="mission" id="actions">
      <div className="mission-stage">
        <div className="mission-shade" aria-hidden="true" />
        <div className="mission-copy">
          <h2>What we are doing.</h2>
          <p>Mark the drains, talk to nearby homes, teach the demo, and keep track of it.</p>
        </div>
        <div className="mission-field" aria-label="Project steps">
          <span className="mission-scanline" />
          <svg className="mission-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path className="mission-path" d="M4 78 C18 50 29 36 43 49 C55 60 57 22 72 28 C86 35 82 70 96 56" />
          </svg>
          <div className="mission-counter">
            <span className="mission-count">0</span>
            <p>project steps</p>
          </div>
          {missionSteps.map((step) => (
            <article className="mission-card" key={step.number} style={{ left: step.x, top: step.y }}>
              <span>{step.number} / {step.verb}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <strong>{step.stat}</strong>
            </article>
          ))}
          <span className="mission-object object-marker">marker</span>
          <span className="mission-object object-hanger">door hanger</span>
          <span className="mission-object object-log">app log</span>
        </div>
      </div>
    </section>
  );
}

function ImpactRun() {
  return (
    <section className="impact" id="app">
      <div className="impact-head">
        <h2>What happens on the ground.</h2>
        <div className="impact-progress" aria-hidden="true"><span /></div>
      </div>
      <div className="impact-track">
        {fieldPanels.map((panel) => (
          <article className="impact-panel" key={panel.label}>
            <figure>
              <img src={panel.image} alt="" />
            </figure>
            <div>
              <p className="eyebrow">{panel.label}</p>
              <strong>{panel.stat}</strong>
              <h3>{panel.title}</h3>
              <p>{panel.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DossierDeck() {
  return (
    <section className="dossiers" id="team">
      <div className="dossier-head">
        <h2>Our team.</h2>
      </div>
      <div className="dossier-grid">
        {team.map(([name, role, text], index) => (
          <article className="dossier-card" key={name} style={{ "--i": index }}>
            <span>field id 0{index + 1}</span>
            <h3>{name}</h3>
            <p>{role}</p>
            <small>{text}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function Final() {
  return (
    <section className="final" id="final">
      <img src={images.lagoon} alt="" aria-hidden="true" />
      <div>
        <h2>
          The lagoon was never disconnected from us.
          <span>We were just disconnected from it.</span>
        </h2>
        <p>Take the survey or use the app to help us keep track.</p>
        <div className="final-actions">
          <a className="button light" href="#app">Get our app</a>
          <a className="button quiet light" href="#final">Take our survey</a>
        </div>
      </div>
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <LagoonPhotoEssay />
      <ContentBand
        kicker="Start here"
        title="Help people notice the drain before it rains."
        text="We are marking drains, teaching the route, and asking what people know before and after."
        dark
      >
        <StatGrid items={[
          ["50-75", "drains marked."],
          ["300-500", "homes reached."],
          ["survey", "what changed."],
          ["1 folder", "so the work does not disappear."],
        ]} />
      </ContentBand>
      <ContentBand
        kicker="Why it matters"
        title="The lagoon is not somewhere else."
        text="It is connected to the streets, yards, classrooms, and drains people pass every day."
      >
        <StoryCards items={lagoonContext} />
      </ContentBand>
      <ContentBand
        kicker="Field notes"
        title="What we are trying to make obvious."
        text="Before the route animation, this is the basic idea behind the whole project."
        dark
      >
        <FieldNotes items={homeNotes} />
      </ContentBand>
      <ContentBand
        kicker="Project brief"
        title="The full story starts with the street."
        text="These paragraphs explain the project in complete sentences so the site can work as a real information source."
      >
        <ProjectEssay items={projectEssays.home} />
      </ContentBand>
      <OverviewGrid />
      <ContentBand
        kicker="Project snapshot"
        title="What this site tracks."
        text="The work is split into field marking, resident outreach, classroom education, and a final archive."
        dark
      >
        <StatGrid items={impactMetrics} />
      </ContentBand>
      <Final />
    </>
  );
}

function ProblemPage() {
  return (
    <>
      <PageHeader
        kicker="Runoff"
        title="The drain is not a filter."
        text="Rain can carry what we leave outside."
        actions={[["Follow the route", "/storm-drains"], ["See the mission", "/mission"]]}
      />
      <ContentBand
        kicker="Cause"
        title="What starts on the street can end up in the lagoon."
        text="That is the part a lot of people never see."
        dark
      >
        <StatGrid items={problemStats} />
      </ContentBand>
      <ContentBand
        kicker="Path"
        title="Street to drain to lagoon."
        text="It is a shorter trip than it feels."
      >
        <ChainList items={runoffChain} />
      </ContentBand>
      <ContentBand
        kicker="What washes in"
        title="Small things move fast in rain."
        text="The real issue is not mysterious. Rain carries loose stuff downhill."
        dark
      >
        <EvidenceRows items={runoffSources} />
      </ContentBand>
      <ContentBand
        kicker="Field notes"
        title="The part people usually do not see."
        text="Runoff sounds abstract until it is written out as a street-level story."
      >
        <FieldNotes items={problemNotes} />
      </ContentBand>
      <ContentBand
        kicker="Project brief"
        title="Why runoff is the problem."
        text="This section slows the issue down into the full route from ordinary street material to lagoon water."
        dark
      >
        <ProjectEssay items={projectEssays.problem} />
      </ContentBand>
      <ProblemScene />
      <ContentBand
        kicker="Shift"
        title="The best time to act is before rain."
        text="Once water enters the drain, it is already moving."
        dark
      >
        <StoryCards items={[
          ["Mark", "Put the reminder where people can see it."],
          ["Teach", "Show students what runoff carries."],
          ["Log", "Save the photos, map, and survey answers."],
        ]} />
      </ContentBand>
    </>
  );
}

function StormDrainsPage() {
  return (
    <>
      <PageHeader
        kicker="Field work"
        title="Street to lagoon."
        text="Follow one rainstorm from the street to the lagoon."
        actions={[["See the mission", "/mission"], ["Track impact", "/impact"]]}
      />
      <Trail />
      <ContentBand
        kicker="Drain marking"
        title="Every marked drain gets saved."
        text="A photo, a location, and a few notes."
      >
        <StatGrid items={stormDrainSpecs} />
      </ContentBand>
      <ContentBand
        kicker="Field protocol"
        title="How a drain gets marked."
        text="The process is small on purpose so it can actually be repeated."
        dark
      >
        <TimelineRows items={drainProtocol} />
      </ContentBand>
      <ContentBand
        kicker="Project folder"
        title="Keep it useful."
        text="The next group should not have to start over."
        dark
      >
        <DataTable rows={fieldDatabase} />
      </ContentBand>
      <ContentBand
        kicker="Route day"
        title="On route day."
      >
        <TimelineRows items={[
          ["Pick", "Choose drains people will actually see."],
          ["Photo", "Take a before and after photo."],
          ["Mark", "Put the reminder on the drain."],
          ["Save", "Add the location and notes."],
        ]} />
      </ContentBand>
      <ContentBand
        kicker="Outreach route"
        title="The route is also the audience."
        text="The closest homes are the ones most likely to recognize the drains and the streets in the message."
      >
        <StoryCards items={outreachDetails} />
      </ContentBand>
      <ContentBand
        kicker="Field notes"
        title="How the route becomes evidence."
        text="The map has to work as a story on the website and as a record after the field day."
        dark
      >
        <FieldNotes items={routeNotes} />
      </ContentBand>
      <ContentBand
        kicker="Project brief"
        title="The route is the project backbone."
        text="The route turns an environmental issue into something that can be walked, marked, mapped, and checked."
      >
        <ProjectEssay items={projectEssays.route} />
      </ContentBand>
    </>
  );
}

function MissionPage() {
  return (
    <>
      <PageHeader
        kicker="Mission"
        title="The plan."
        text="Do the work where people already live, walk, and learn."
        actions={[["View impact", "/impact"], ["Meet the team", "/team"]]}
      />
      <MissionSequence />
      <ContentBand
        kicker="What we do"
        title="Four simple jobs."
        text="Each one leaves something useful behind."
        dark
      >
        <StoryCards items={missionBlueprint} />
      </ContentBand>
      <ContentBand
        kicker="Timeline"
        title="Before, during, after."
        text="Plan it, do it, then leave it organized."
      >
        <TimelineRows items={campaignTimeline} />
      </ContentBand>
      <ContentBand
        kicker="Outreach"
        title="What residents actually see."
        text="The campaign avoids long speeches. It puts the message in the places people already move through."
        dark
      >
        <StoryCards items={outreachDetails} />
      </ContentBand>
      <ContentBand
        kicker="Classroom"
        title="The demo makes the route visible."
        text="Students can understand runoff faster when they see clean water change in front of them."
      >
        <StoryCards items={classroomDetails} />
      </ContentBand>
      <ContentBand
        kicker="Field notes"
        title="How the plan actually works."
        text="The project only works if each piece connects to the next one."
        dark
      >
        <FieldNotes items={missionNotes} />
      </ContentBand>
      <ContentBand
        kicker="Project brief"
        title="Mark, inform, educate, and save the proof."
        text="The mission is practical because every part creates a record or a visible public message."
      >
        <ProjectEssay items={projectEssays.mission} />
      </ContentBand>
      <ContentBand
        kicker="What stays"
        title="What we leave behind."
        dark
      >
        <EvidenceRows items={[
          ["Drain map", "Where we marked drains."],
          ["Outreach notes", "Where the door hangers went."],
          ["Classroom materials", "The demo and what students saw."],
          ["Project folder", "Photos, survey answers, and app notes."],
        ]} />
      </ContentBand>
    </>
  );
}

function ImpactPage() {
  return (
    <>
      <PageHeader
        kicker="Impact"
        title="What we can prove."
        text="Marked drains, survey answers, classroom work, and a folder someone else can use."
        actions={[["Take the survey", "/survey"], ["Meet the team", "/team"]]}
      />
      <ImpactRun />
      <ContentBand
        kicker="What we saved"
        title="The proof should be easy to check."
        text="Photos, survey answers, class materials, route notes, and the map all need to stay together."
        dark
      >
        <EvidenceRows items={impactEvidence} />
      </ContentBand>
      <ContentBand
        kicker="Numbers"
        title="The targets are concrete."
        text="The point is not to sound big. The point is to finish things people can verify."
      >
        <StatGrid items={impactMetrics} />
      </ContentBand>
      <ContentBand
        kicker="Survey"
        title="Did people understand the connection?"
        text="The survey is there to check that, not just to collect names."
        dark
      >
        <StatGrid items={[
          ["Before", "What people knew at first."],
          ["After", "What changed later."],
          ["QR", "Easy to open on a phone."],
          ["Result", "More people know where drains lead."],
        ]} />
      </ContentBand>
      <ContentBand
        kicker="Archive"
        title="Evidence should be easy to find."
        text="A final folder matters because a good project becomes weak if the proof is scattered."
      >
        <EvidenceRows items={archiveItems} />
      </ContentBand>
      <ContentBand
        kicker="Field notes"
        title="What counts as impact."
        text="The honest version is more believable than pretending one campaign fixes everything."
        dark
      >
        <FieldNotes items={impactNotes} />
      </ContentBand>
      <ContentBand
        kicker="Project brief"
        title="Impact means proof people can check."
        text="This is the fuller version of what the project can honestly claim when the campaign is complete."
      >
        <ProjectEssay items={projectEssays.impact} />
      </ContentBand>
    </>
  );
}

function TeamPage() {
  return (
    <>
      <PageHeader
        kicker="Field team"
        title="The people doing the work."
        text="Everyone has a part to handle."
        actions={[["See mission", "/mission"], ["Help out", "/survey"]]}
      />
      <DossierDeck />
      <ContentBand
        kicker="Roles"
        title="Who handles what."
        text="This keeps the work from turning into a mess."
        dark
      >
        <EvidenceRows items={teamResponsibilities} />
      </ContentBand>
      <ContentBand
        kicker="Process"
        title="How we keep moving."
      >
        <TimelineRows items={[
          ["Plan", "Pick the route and set dates."],
          ["Collect", "Do field days, demos, and surveys."],
          ["Organize", "Name files and keep them together."],
          ["Explain", "Turn the work into a clear final story."],
        ]} />
      </ContentBand>
      <ContentBand
        kicker="Deliverables"
        title="What each person helps finish."
        text="The team roles are tied to files, routes, photos, lessons, and survey results."
        dark
      >
        <EvidenceRows items={[
          ["Report", "Final writing, project explanation, and competition-ready summary."],
          ["Route", "Drain list, before/after photos, and location records."],
          ["Outreach", "Door hanger notes, QR survey access, and neighborhood coverage."],
          ["Lesson", "Classroom demo materials and student explanation."],
          ["Data", "App log, survey exports, and organized archive."],
        ]} />
      </ContentBand>
      <ContentBand
        kicker="Field notes"
        title="How the team stays organized."
        text="The roles are practical. They exist because the project has a lot of small pieces."
      >
        <FieldNotes items={teamNotes} />
      </ContentBand>
      <ContentBand
        kicker="Project brief"
        title="The team structure keeps the evidence clean."
        text="The project needs clear ownership because field work, outreach, education, and data all depend on each other."
        dark
      >
        <ProjectEssay items={projectEssays.team} />
      </ContentBand>
    </>
  );
}

function SurveyPage() {
  return (
    <>
      <PageHeader
        kicker="Help out"
        title="Take the survey or use the app."
        text="Either one helps us understand what people notice."
        actions={[["Back to home", "/"], ["See impact", "/impact"]]}
      />
      <ContentBand
        kicker="Survey"
        title="A short survey."
        text="Just enough to see if the message is working."
        dark
      >
        <StoryCards items={surveyPlan} />
      </ContentBand>
      <ContentBand
        kicker="Questions"
        title="What the survey is trying to learn."
        text="The questions should show whether people understand the drain-to-lagoon connection."
      >
        <EvidenceRows items={surveyQuestions} />
      </ContentBand>
      <ContentBand
        kicker="Field notes"
        title="Why the survey matters."
        text="The survey is useful only if it is short, fair, and easy to compare later."
        dark
      >
        <FieldNotes items={surveyNotes} />
      </ContentBand>
      <ContentBand
        kicker="Project brief"
        title="The survey checks whether the message landed."
        text="The survey is short, but it gives the project a way to compare awareness before and after outreach."
      >
        <ProjectEssay items={projectEssays.survey} />
      </ContentBand>
      <ContentBand
        kicker="How to help"
        title="What you can do before rain."
        dark
      >
        <TimelineRows items={[
          ["Scan", "Take the survey."],
          ["Look", "Notice the drains near you."],
          ["Move", "Keep clippings and trash away."],
          ["Tell", "Explain it to one other person."],
        ]} />
      </ContentBand>
      <Final />
    </>
  );
}

function ResourcesPage() {
  return (
    <>
      <PageHeader
        kicker="Archive"
        title="The folder after the field day."
        text="The work matters more when someone else can open it, check it, and keep going."
        actions={[["Open survey", "/survey"], ["See impact", "/impact"]]}
      />
      <ContentBand
        kicker="Files"
        title="Project resources."
        text="These are the pieces someone would need to understand or repeat the campaign."
        dark
      >
        <ResourceRows items={resourceLinks} />
      </ContentBand>
      <ContentBand
        kicker="Archive"
        title="What belongs in the final folder."
        text="The folder should tell the story without needing someone from the team to explain every file."
      >
        <EvidenceRows items={archiveItems} />
      </ContentBand>
      <ContentBand
        kicker="Field notes"
        title="How to make the archive usable."
        text="The archive should help someone continue the project, not just admire it."
        dark
      >
        <FieldNotes items={resourceNotes} />
      </ContentBand>
      <ContentBand
        kicker="Project brief"
        title="The archive is how the work survives."
        text="These paragraphs explain what belongs in the handoff and why the folder matters."
      >
        <ProjectEssay items={projectEssays.resources} />
      </ContentBand>
      <ContentBand
        kicker="Handoff"
        title="The next group should start ahead."
        text="A good handoff gives them the route, the message, the materials, and the evidence."
        dark
      >
        <TimelineRows items={[
          ["Route map", "Marked drains, streets, locations, and photo links."],
          ["Outreach kit", "Door hanger copy, survey QR link, and neighborhood notes."],
          ["Classroom kit", "Demo plan, materials list, and lesson notes."],
          ["Impact file", "Counts, survey exports, summary notes, and final reflection."],
        ]} />
      </ContentBand>
      <Final />
    </>
  );
}

function NotFoundPage() {
  return (
    <PageHeader
      kicker="404"
      title="Page not found."
      text="That route is not part of the field file yet."
      actions={[["Return home", "/"]]}
    />
  );
}

function getRoute(pathname) {
  switch (pathname) {
    case "/":
      return <HomePage />;
    case "/problem":
      return <ProblemPage />;
    case "/storm-drains":
      return <StormDrainsPage />;
    case "/mission":
      return <MissionPage />;
    case "/impact":
      return <ImpactPage />;
    case "/team":
      return <TeamPage />;
    case "/resources":
      return <ResourcesPage />;
    case "/survey":
      return <SurveyPage />;
    default:
      return <NotFoundPage />;
  }
}

export default function App() {
  const root = useMotion();
  const path = window.location.pathname;
  useRouteProgress(path);

  return (
    <main ref={root}>
      <PavelFluidBackground />
      <Cursor />
      <TopNavigation path={path} />
      {getRoute(path)}
    </main>
  );
}
