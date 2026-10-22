package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Project struct {
	ID          int      `json:"id"`
	Name        string   `json:"name"`
	Status      string   `json:"status"`
	Description string   `json:"description"`
	Stack       []string `json:"stack"`
}

func getProjects(c *gin.Context) {
	dataPath := filepath.Join("data", "projects.json")

	file, err := os.ReadFile(dataPath)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Unable to read project data",
		})
		return
	}

	var projects []Project
	if err := json.Unmarshal(file, &projects); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Invalid projects JSON",
		})
		return
	}

	c.JSON(http.StatusOK, projects)
}
func main() {
	gin.SetMode(gin.ReleaseMode)

	router := gin.New()
	router.Use(gin.Logger(), gin.Recovery())

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
		},
		AllowMethods: []string{
			"GET",
			"OPTIONS",
		},
		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Accept",
		},
	}))

	if err := router.SetTrustedProxies(nil); err != nil {
		panic(err)
	}

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:5173"},
		AllowMethods: []string{"GET", "OPTIONS"},
		AllowHeaders: []string{"Origin", "Content-Type", "Accept"},
	}))

	router.GET("/api/v1/projects", getProjects)

	router.Run(":8181")
}
