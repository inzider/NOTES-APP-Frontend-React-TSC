


// export interface IResponse {
//     success: boolean,
//     message:string, 
//     data?: {
//         _id?: string,
//         note?:string,
//         status?:string
//     }
// };

/**
 * Methods to fetch the backend REST API
 */
class NotesApi {

    private url:string = 'http://localhost:3001/notes/';


    /**
     * getAllNotes
     * 
     * @returns Promise<Note[]>
     */
     async getAllNotes(): Promise<any> {

        const response = await fetch(this.url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Could not fetch notes');
        }
        return data;
    }



    /**
     * createNote
     * 
     * @param note:string 
     * @param status:string 
     * @returns Promise<Note>
     */
    async createNote(note:string, status:string): Promise<any> {
        
        const response = await fetch(this.url, {
            method: 'POST',
            body: JSON.stringify({note, status}),
            headers: {
              'Content-Type': 'application/json',
            },  
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || 'Could not create note');
        }
        return data;
    }

    


    /**
     * getOneNote
     * 
     * @param id:string 
     * @returns Promise<Note>
     */
    async getOneNote(id:string):Promise<any> {

        const response = await fetch(this.url+id)
        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || 'Could not fetch note');
        }
        return data;
    }


    /**
     * updateNote
     * 
     * @param id:string 
     * @param note:string 
     * @param status:string 
     * @returns Promise<Note>
     */
    async updateNote(id:string, note:string, status:string):Promise<any> {

        const response = await fetch(this.url+id, {
            method: 'PATCH',
            body: JSON.stringify({note, status}),
            headers: {
                'Content-Type': 'application/json',
            },  
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Could not update note');
        }
        
        return data;
    }


    /**
     * deleteNote
     * 
     * @param id:string 
     * @returns Promise<Note>
     */
    async deleteNote(id:string):Promise<any> {

        const response = await fetch(this.url+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },  
        });

        const data = await response.json();
    
        if (!response.ok) {
            throw new Error(data.message || 'Could not update note');
        }
        return data;
    }
}




export default new NotesApi();