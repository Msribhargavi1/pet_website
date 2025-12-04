from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse

class ResourceNotFoundException(Exception):
    def __init__(self, resource: str, resource_id: int):
        self.resource = resource
        self.resource_id = resource_id
        super().__init__(f"{resource} with id {resource_id} not found")

async def resource_not_found_handler(request: Request, exc: ResourceNotFoundException):
    return JSONResponse(
        status_code=404,
        content={
            "error": "Not Found",
            "message": str(exc)
        }
    )
