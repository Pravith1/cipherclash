const express = require("express");
const router = express.Router();
const Team = require("../models/Team");


// POST /api/register
router.post("/register", async (req, res) => {
  try {
    const { teamName, department, yearOfStudy, teamSize, members } = req.body;

    // Validate members count matches teamSize
    if (!members || members.length !== parseInt(teamSize)) {
      return res.status(400).json({
        success: false,
        message: `Team size is ${teamSize} but ${members?.length || 0} member(s) provided`,
      });
    }

    // Check Member1 and Member2 don't have same email
    if (teamSize === 2 || teamSize === "2") {
      if (
        members[0].email.toLowerCase() === members[1].email.toLowerCase()
      ) {
        return res.status(400).json({
          success: false,
          message: "Member 1 and Member 2 cannot have the same email address",
        });
      }
    }

    // Collect all emails from incoming members
    const incomingEmails = members.map((m) => m.email.toLowerCase());

    // Check for duplicate emails across all existing registrations
    const existingTeams = await Team.find({
      "members.email": { $in: incomingEmails },
    });

    if (existingTeams.length > 0) {
      const usedEmails = [];
      existingTeams.forEach((team) => {
        team.members.forEach((member) => {
          if (incomingEmails.includes(member.email.toLowerCase())) {
            usedEmails.push(member.email);
          }
        });
      });
      return res.status(409).json({
        success: false,
        message: `The following email(s) are already registered: ${usedEmails.join(", ")}`,
      });
    }

    // Check team name uniqueness
    const existingTeamName = await Team.findOne({
      teamName: { $regex: new RegExp(`^${teamName}$`, "i") },
    });
    if (existingTeamName) {
      return res.status(409).json({
        success: false,
        message: `Team name "${teamName}" is already taken`,
      });
    }

    // Create and save team
    const normalizedMembers = members.map((m) => ({
      ...m,
      email: m.email.toLowerCase(),
    }));

    const newTeam = new Team({
      teamName,
      department,
      yearOfStudy: parseInt(yearOfStudy),
      teamSize: parseInt(teamSize),
      members: normalizedMembers,
    });

    await newTeam.save();

    return res.status(201).json({
      success: true,
      message: "Registration successful! See you at CipherClash.",
      data: {
        teamName: newTeam.teamName,
        department: newTeam.department,
        yearOfStudy: newTeam.yearOfStudy,
        teamSize: newTeam.teamSize,
        members: newTeam.members.map((m) => ({
          name: m.name,
          email: m.email,
          rollNumber: m.rollNumber,
        })),
        registeredAt: newTeam.createdAt,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages.join(". "),
      });
    }
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Team name already exists",
      });
    }
    console.error("Registration error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again.",
    });
  }
});

// GET /api/teams (for admin/debug)
router.get("/teams", async (req, res) => {
  try {
    const teams = await Team.find().select("-__v");
    return res.json({ success: true, count: teams.length, data: teams });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
