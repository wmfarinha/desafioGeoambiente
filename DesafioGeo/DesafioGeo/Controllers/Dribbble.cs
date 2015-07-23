using System;
using System.Collections.Generic;
using RestSharp;

namespace DesafioGeo.Controllers
{
    public class Dribbble
    {
        public int page { get; set; }
        public int per_page { get; set; }
        public int pages { get; set; }

        public int total { get; set; }
        public List<Shots> shots { get; set; }

        public class Shots
        {
            public string id { get; set; }
            public string title { get; set; }
            public int likes_count { get; set; }
            public int comments_count { get; set; }
            public int views_count { get; set; }
            public string image_url { get; set; }
            public Player player { get; set; }

            public class Player
            {
                public int id { get; set; }
                public string name { get; set; }
                public string location { get; set; }
                public string avatar_url { get; set; }
            }

        }

        private readonly RestClient _client;
        private readonly string _url = "http://api.dribbble.com/";

        public Dribbble()
        {
            _client = new RestClient(_url);
        }

        public List<Dribbble> GetAll(int paginaId = 1)
        {
            var request = new RestRequest("shots/popular?page={param}", Method.GET) { RequestFormat = DataFormat.Json };
            request.AddParameter("param", paginaId, ParameterType.UrlSegment);
            var response = _client.Execute<List<Dribbble>>(request);

            if (response.Data == null)
                throw new Exception(response.ErrorMessage);

            return response.Data;
        }

        public Dribbble.Shots GetById(int id)
        {
            var request = new RestRequest("shots/{id}", Method.GET) { RequestFormat = DataFormat.Json };
            request.AddParameter("id", id, ParameterType.UrlSegment);
            var response = _client.Execute<Dribbble.Shots>(request);

            if (response.Data == null)
                throw new Exception(response.ErrorMessage);

            return response.Data;
        }
    }
}