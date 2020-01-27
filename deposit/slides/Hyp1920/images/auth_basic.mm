sequenceDiagram 
  Client->>Server: GET /login HTTP/1.1 
  Server->>Client: 401 Unauthorized  
  activate Client 
  Server->>Client: GET /login 
