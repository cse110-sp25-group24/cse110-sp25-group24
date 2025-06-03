// create IndexedDB memory for test
global.IDBTrans = class {
    objectStore(name) {
        return new IDBObjectStore();
    }
};

// represents memories table, needs delete to return a request object
global.IDBObjectStore = class {
    delete(key) { 
        return new IDBRequest;
    }
};
// request object that basically simulates the indexdb async delete
global.IDBRequest = class {
    constructor() {
        this.onsuccess = null;
        this.onerror = null;
        this.shouldFail = false;
        this.error = null;
        //async behaviour
        setTimeout(() => {
            if (this.shouldFail) {
                this.error = new Error('Could not Delete - Operation failed');
                this.onerror?.();
            } else {
                this.onsuccess?.();
            }
        }, 0);
    }    
    //simple method to force failure
    simulateFailure() {
        this.shouldFail = true;
    }
}
//create DB for test that throws error if shouldfail is true
const createTestDB = (shouldFailTrans = false) => ({
    transaction() {
        if (shouldFailTrans) { 
            throw new Error('Transaction failed');
        }
        return new IDBTrans();
    }
});
//import function we're testing
import { deleteMemory } from "../scripts/dataHandlingFunctions";

describe('deleteMemory', () => { 
    let consoleSpy;
    // setup to capture log calls before the tests
    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    });
    // after the tests, clean up
    afterEach(() => {
        consoleSpy.mockRestore();
    });

    //test 1 - success
    it('should successfully delete the memory', async () => {
        const testDB = createTestDB()
        const postId = 69;

        const result = await deleteMemory(postId, testDB); //simple test, self explanatory 

        expect(result).toBe(true);
        expect(consoleSpy).toHaveBeenCalledWith(`deleted post #${postId}`);
    });

    //test 2 - error when creating transaction - delete never goes through
    it('should reject when transaction creation fails', async () => {
        const testDB = createTestDB(true); //true so it forces error
        const postId = 420;

        await expect(deleteMemory(postId, testDB)).rejects.toEqual(
        new Error('Transaction failed')
        );
    })
    
    //test 3 - transaction created, but error when delete fails
    it('should reject when delete request fails', async () => {
        const testDB = createTestDB();
        const postId = 80085;

        //now essentially saves the old delete, while creating a new delete designed to fail
        const oldDelete = IDBObjectStore.prototype.delete;
        IDBObjectStore.prototype.delete = () => {
            const request = new IDBRequest;
            request.simulateFailure(); //make request return true for simulateFailure
            return request;
        };

        await expect(deleteMemory(postId, testDB)).rejects.toEqual( //returns could not delete error from above 
            new Error('Could not Delete - Operation failed')
        );
        expect(consoleSpy).toHaveBeenCalledWith('error deleting post');

        IDBObjectStore.prototype.delete = oldDelete;
    });
});




