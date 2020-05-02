
from diagrams.onprem.database import Postgresql
from diagrams.onprem.client import Client

from diagrams import Cluster, Diagram
from diagrams.aws.compute import EC2
from diagrams.aws.network import APIGateway
from diagrams.aws.database import RDS
from diagrams.aws.storage import S3


with Diagram("Backend structure", filename="soa", outformat="pdf", show=False):
    with Cluster("Presentation layer"):
        cl = Client("Browser")
        s3 = S3("Static assets")
    with Cluster("Application server"):
        with Cluster("API layer"): 
            api = APIGateway("OpenAPI gateway")
            reqmgr = EC2("Controllers")
        svcs = EC2("Services")

    with Cluster("Data Layer"):
        dmgr = svcs >> Postgresql("Database")
    cl >> api >> reqmgr >> svcs
    cl >> s3
